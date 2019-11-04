import * as scraper from '../scraper'

const priceSelector = '[itemprop=price]'
const imageSelector = '.product_main_image'
const productNameSelector = '.main_header'

export default function scrapCoppelProduct (html) {
  const image = scraper.scrapImage(html, imageSelector)
  const price = scraper.currencyStringToNumber(scraper.scrapText(html, priceSelector))
  const title = scraper.scrapText(html, productNameSelector)
  return {image, title, price}
}
