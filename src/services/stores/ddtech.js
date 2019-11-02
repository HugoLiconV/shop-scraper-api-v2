import * as scraper from '../scraper'

const priceSelector = '#slideslide0 > a > img'
const productNameSelector = 'div[class=price-box] > span[class=price]'
const imageSelector = 'h1[class=name]'

export default function scrapDDTechProduct (html) {
  const image = scraper.scrapImage(html, imageSelector)
  const currentPrice = scraper.currencyStringToNumber(scraper.scrapText(html, priceSelector))
  const name = scraper.scrapText(html, productNameSelector)
  return { image, name, currentPrice }
}
