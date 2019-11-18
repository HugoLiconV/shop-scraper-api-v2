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
import verifyProductData from '../stores/error'
import wait from 'waait'
const Sentry = require('@sentry/node')

cron.schedule('0 * * * *', () => {
  scrapProducts()
})

export async function scrapProducts () {
  const totalProducts = await TrackedProduct.find({ wasPurchased: false }).count()
  const trackedProducts = await TrackedProduct.find({wasPurchased: false})
    .limit(totalProducts)
    .populate('user')
    .populate('product')

  console.log(chalk.green('\nrunning a task every hour ⏲️'))
  console.log(chalk.blue('Total products to scrap: ', totalProducts))
  for (let index = 0; index < trackedProducts.length; index++) {
    await wait(500)
    const { id: trackedProductId, product, user, desiredPrice, notify } = trackedProducts[index]
    try {
      const html = await getHTML(product.link)
      const productData = scrapProductFromStore(product.store, html)
      verifyProductData(productData)
      const currentPrice = productData.price
      console.log(chalk.cyan(`[cron]: ${index}.- ${product.title}`))
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
//           Sentry.captureEvent({
//             message: 'Error sending email',
//             extra: {
//               error,
//               product
//             }
//           })
          shouldNotify = true
        })
      } else {
        if (!currentPriceIsLessThanDesired) {
          shouldNotify = true
        }
      }
      await Promise.all([
        updateProduct({ ...product, price: currentPrice }, product.id),
        createLog({ product: product.id, price: currentPrice }),
        localUpdate({ notify: shouldNotify }, trackedProductId)
      ]).catch(error => {
        console.log('error', error)
      })
    } catch (error) {
      console.log(chalk.red(`[${product.title}]: ${error}`))
//       Sentry.captureEvent({
//         message: error,
//         extra: {
//           error,
//           product
//         }
//       })
    }
  }
}
