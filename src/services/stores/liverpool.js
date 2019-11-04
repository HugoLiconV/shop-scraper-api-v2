import * as scraper from '../scraper'

const priceSelector = '.a-product__paragraphDiscountPrice' // it return the price in this way: 379920 which it means 3799.20
const imageSelector = '#image-real'
const productNameSelector = '.a-product__information--title'

export default function scrapLiverpoolProduct (html) {
  const image = scraper.scrapImage(html, imageSelector)
  const price = scraper.currencyStringToNumber(
    scraper.scrapText(html, priceSelector) / 100
  )
  const title = scraper.scrapText(html, productNameSelector)
  return { image, title, price }
}
