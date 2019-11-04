import * as scraper from '../scraper'

const priceSelector = '#precioCambio'
const imageSelector = '[data-zoom-image]'
const productNameSelector = '.productMainContainer > h1'

export default function scrapSearsProduct (html) {
  const image = scraper.scrapImage(html, imageSelector)
  const price = scraper.currencyStringToNumber(
    scraper.scrapText(html, priceSelector)
  )
  const title = scraper.scrapText(html, productNameSelector)
  return { image, title, price }
}
