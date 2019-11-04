import cron from 'node-cron'
import chalk from 'chalk'
import { TrackedProduct } from '../../api/tracked-product'
import { getHTML } from '../scraper'
import { sendMail } from '../sendgrid'
import { create as createLog } from '../../api/log/controller'
import { update as updateProduct } from '../../api/product/controller'
import scrapProductFromStore from '../stores'
import { localUpdate } from '../../api/tracked-product/controller'
import getMailContent from '../sendgrid/template'

cron.schedule('0 * * * *', () => {
  scrapProducts()
})

export async function scrapProducts () {
  console.log(chalk.green('\nrunning a task every hour ⏲️'))

  const trackedProducts = await TrackedProduct.find()
    .populate('user')
    .populate('product')
  trackedProducts.forEach(async ({ id: trackedProductId, product, user, desiredPrice, notify }) => {
    const html = await getHTML(product.link)
    const store = product.store
    const currentPrice = scrapProductFromStore(store, html).currentPrice
    let shouldNotify = notify
    const currentPriceIsLessThanDesired = currentPrice * 100 < desiredPrice * 100
    if (currentPriceIsLessThanDesired && shouldNotify) {
      const { email } = user
      console.log(`Sending Notification to ${email}📧`)
      const content = getMailContent(product, desiredPrice, currentPrice)
      // Next time, the user will be not be notified to avoid spam.
      shouldNotify = false
      await sendMail({
        toEmail: email,
        subject: `Alerta de precio ${product.title}`,
        content
      }).catch(error => {
        console.log(`Error sending email ${error}`)
        shouldNotify = true
      })
    } else {
      if (!currentPriceIsLessThanDesired) {
        shouldNotify = true
      }
    }

    /* Update product, trackedProduct */
    try {
      await Promise.all([
        updateProduct({ ...product, price: currentPrice }, product.id),
        createLog({ product: product.id, price: currentPrice }),
        localUpdate({notify: shouldNotify}, trackedProductId)
      ])
    } catch (error) {
      console.log('error', error)
    }
  })
}
