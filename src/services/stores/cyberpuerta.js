import * as scraper from '../scraper'

const priceSelector = '.priceText'
const productNameSelector = '.detailsInfo_right_title'
const imageSelector = 'a[id=emzoommainpic] > img'

export default function scrapCyberpuertaProduct (html) {
  const image = scraper.scrapImage(html, imageSelector)
  const price = scraper.currencyStringToNumber(scraper.scrapText(html, priceSelector))
  const title = scraper.scrapText(html, productNameSelector)
  return { image, title, price }
}
