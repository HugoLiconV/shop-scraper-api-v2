import * as scraper from '../scraper'

const priceSelector = 'div[class=price-box] > span[class=price]'
const productNameSelector = 'h1[class=name]'
const imageSelector = '#slideslide0 > a > img'

export default function scrapDDTechProduct (html) {
  const image = scraper.scrapImage(html, imageSelector)
  const price = scraper.currencyStringToNumber(scraper.scrapText(html, priceSelector))
  const title = scraper.scrapText(html, productNameSelector)
  return { image, title, price }
}
