import * as scraper from '../scraper'

const priceSelector = '.price-tag-fraction'
const imageSelector = '.ui-pdp-image'
const productNameSelector = '.ui-pdp-title'

export default function scrapMercadoLibreProduct (html) {
  const image = scraper.scrapImage(html, imageSelector)
  const price = scraper.currencyStringToNumber(scraper.scrapText(html, priceSelector))
  const title = scraper.scrapText(html, productNameSelector)
  return {image, title, price}
}
