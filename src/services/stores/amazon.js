import * as scraper from '../scraper'

const priceSelector = '#priceblock_ourprice'
const imageSelector = '[data-old-hires]'
const productNameSelector = '#productTitle'
const imageAttribute = 'data-old-hires'

export default function scrapAmazonProduct (html) {
  const image = scraper.scrapImage(html, imageSelector, imageAttribute)
  const title = scraper.scrapText(html, productNameSelector)
  const price = scraper.scrapText(html, priceSelector)
  if (!price || price === 0) {
    // sometimes the selector change if there is a discount in the product
    const newPrice = scraper.scrapText(html, '#priceblock_dealprice')
    return {
      image,
      title,
      price: scraper.currencyStringToNumber(newPrice)
    }
  }
  return { image, title, price: scraper.currencyStringToNumber(price) }
}
