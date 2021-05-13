import * as scraper from '../scraper'

const priceSelector = '.price-tag-fraction'
const productNameSelector = '.ui-pdp-title'

export default function scrapMercadoLibreProduct (html) {
  const price = scraper.currencyStringToNumber(scraper.scrapText(html, priceSelector))
  const title = scraper.scrapText(html, productNameSelector)
  return {title, price}
}
