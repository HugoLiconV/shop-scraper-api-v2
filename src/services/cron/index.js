import cron from 'node-cron'
import chalk from 'chalk'
import { TrackedProduct } from '../../api/tracked-product'
import { getHTML, scrapPriceCyberPuerta, scrapPriceDDTech, scrapPriceAmazon } from '../scraper'
import { sendMail } from '../sendgrid'
import { create as createLog } from '../../api/log/controller'
import { update as updateProduct } from '../../api/product/controller'

cron.schedule('0 * * * *', () => {
  scrapProducts()
})

export async function scrapProducts () {
  console.log(chalk.green('\nrunning a task every 30 minutes ⏲️'))
  const products = await TrackedProduct.find()
    .populate('user')
    .populate('product')
  products.forEach(async ({ product, user, desiredPrice, notify }) => {
    const html = await getHTML(product.link)
    const oldPrice = product.price
    const newPrice =
      product.store === 'Cyber Puerta'
        ? scrapPriceCyberPuerta(html).price
        : product.store === 'Amazon'
          ? scrapPriceAmazon(html)
          : scrapPriceDDTech(html)
    const color =
      newPrice * 100 < desiredPrice * 100
        ? chalk.green
        : newPrice * 100 > oldPrice * 100
          ? chalk.red
          : chalk.white
    console.log(color(`Old price: ${oldPrice}, new one: ${newPrice}`))
    let shouldNotify = notify
    if (newPrice * 100 < desiredPrice * 100 && notify) {
      const { email } = user
      console.log(`Sending Notification to ${email}📧`)
      const content = `
        <h1>¡Buenas Noticias!</h1>
        <img
          style="width: 128px; margin: 0 auto"
          alt=${product.title}
          src=${product.imageUrl || 'https://ca.weiserlock.com/img/global/no_image.png'} />
        <p>
          El precio de <a href=${product.link} target="_blank" rel="noopener noreferrer">
          ${product.title} </a> ha caído por debajo del precio deseado.
        </p>
      `
      shouldNotify = false
      // try {
      //   await sendMail({
      //     toEmail: email,
      //     subject: `Alerta de precio ${product.title}`,
      //     content
      //   })
      // } catch (error) {
      //   console.log(`Error sending email ${error}`)
      // }
    } else {
      shouldNotify = true
    }
    // Upate Cyber Puerta Image Products
    const imageUrl =
      !product.imageUrl && product.store === 'Cyber Puerta'
        ? scrapPriceCyberPuerta(html).img
        : product.imageUrl

    /* Update product, trackedProduct */
    try {
      await Promise.all([
        updateProduct({ ...product, price: newPrice, notify: shouldNotify, imageUrl }, product.id),
        createLog({ product: product.id, price: newPrice })
      ])
    } catch (error) {
      console.log('error', error)
    }
  })
}
