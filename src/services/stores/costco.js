import * as scraper from '../scraper'

const priceSelector = 'span[class=product-price-amount] > span[class=notranslate]'
const productNameSelector = 'h1[class=product-name]'
const imageSelector = '[data-src]'
const imageAttribute = 'data-src'

export default function scrapCostcoProduct (html) {
  const image = scraper.scrapImage(html, imageSelector, imageAttribute)
  const price = scraper.currencyStringToNumber(scraper.scrapText(html, priceSelector))
  const title = scraper.scrapText(html, productNameSelector)
  if (!price || price === 0) { // sometimes the selector change if there is a discount in the product
    const newPrice = scraper.currencyStringToNumber(scraper.scrapText(html, '.you-pay-value'))
    return { image: `https://www.costco.com.mx${image}`, title, price: newPrice }
  }
  return { image: `https://www.costco.com.mx${image}`, title, price }
}
