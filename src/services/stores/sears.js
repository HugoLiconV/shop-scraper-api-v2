import * as scraper from '../scraper'

const priceSelector = '#precioCambio'
const imageSelector = '[data-zoom-image]'
const productNameSelector = '.productMainContainer > h1'

export default function scrapSearsProduct (html) {
  const image = scraper.scrapImage(html, imageSelector)
  const currentPrice = scraper.currencyStringToNumber(
    scraper.scrapText(html, priceSelector)
  )
  const name = scraper.scrapText(html, productNameSelector)
  return { image, name, currentPrice }
}
