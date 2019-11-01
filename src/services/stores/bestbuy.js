import * as scraper from '../scraper'

const priceSelector = '.product-price'
const imageSelector = '.primary-image'
const productNameSelector = '.type-subhead-alt-regular'

export default function scrapBestBuyProduct (html) {
  const image = scraper.scrapImage(html, imageSelector)
  const currentPrice = scraper.currencyStringToNumber(scraper.scrapText(html, priceSelector))
  const name = scraper.scrapText(html, productNameSelector)
  return {image, name, currentPrice: 9999}
}
