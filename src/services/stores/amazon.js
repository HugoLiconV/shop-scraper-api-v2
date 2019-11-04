import * as scraper from '../scraper'

const priceSelector = '#priceblock_ourprice'
const imageSelector = '[data-old-hires]'
const productNameSelector = '#productTitle'
const imageAttribute = 'data-old-hires'

export default function scrapAmazonProduct (html) {
  const image = scraper.scrapImage(html, imageSelector, imageAttribute)
  const price = scraper.currencyStringToNumber(
    scraper.scrapText(html, priceSelector)
  )
  const title = scraper.scrapText(html, productNameSelector)
  return { image, title, price }
}
