import * as scraper from '../scraper'

const priceSelector = '.priceText'
const productNameSelector = '#emzoommainpic > img'
const imageSelector = '.detailsInfo_right_title'

export default function scrapCyberpuertaProduct (html) {
  const image = scraper.scrapImage(html, imageSelector)
  const currentPrice = scraper.currencyStringToNumber(scraper.scrapText(html, priceSelector))
  const name = scraper.scrapText(html, productNameSelector)
  return { image, name, currentPrice }
}
