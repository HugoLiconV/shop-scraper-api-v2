import * as scraper from '../scraper'

const priceSelector = '.product-price'
const imageSelector = '.primary-image'
const productNameSelector = '.type-subhead-alt-regular'

export default function scrapBestBuyProduct (html) {
  const image = scraper.scrapImage(html, imageSelector)
  const price = scraper.currencyStringToNumber(scraper.scrapText(html, priceSelector))
  const title = scraper.scrapText(html, productNameSelector)
  return { image, title, price: price }
}
