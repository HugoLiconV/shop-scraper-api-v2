import * as scraper from '../scraper'

const priceSelector = '.you-pay-value'
const productNameSelector = '.product-name'
const imageSelector = '[data-src]'
const imageAttribute = 'data-src'

export default function scrapCostcoProduct (html) {
  const image = scraper.scrapImage(html, imageSelector, imageAttribute)
  const currentPrice = scraper.currencyStringToNumber(scraper.scrapText(html, priceSelector))
  const name = scraper.scrapText(html, productNameSelector)
  return { image: `https://www.costco.com.mx${image}`, name, currentPrice };
}
