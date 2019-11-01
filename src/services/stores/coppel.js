import * as scraper from '../scraper'

const priceSelector = '[itemprop=price]'
const imageSelector = '.product_main_image'
const productNameSelector = '.main_header'

export default function scrapCoppelProduct (html) {
  const image = scraper.scrapImage(html, imageSelector)
  const currentPrice = scraper.currencyStringToNumber(scraper.scrapText(html, priceSelector))
  const name = scraper.scrapText(html, productNameSelector)
  return {image, name, currentPrice}
}
