import * as scraper from '../scraper'

const priceSelector = '#priceblock_ourprice'
const imageSelector = '[data-old-hires]'
const productNameSelector = '#productTitle'
const imageAttribute = 'data-old-hires'

export function getAffiliatedLink (link) {
  const regex = /^(https?:\/\/)?www.amazon.com.mx\/(\S+-?\/)?\w{2}\/(?<id>[A-Z0-9]+)/
  const affiliatedParams =
    '/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&linkCode=as2&tag=pricer0b-20'
  const amazonLink = 'https://www.amazon.com.mx/gp/product/'
  const result = regex.exec(link)
  if (result && result.groups && result.groups.id) {
    const id = result.groups.id
    return `${amazonLink}${id}${affiliatedParams}`
  }
  return link
}

export default function scrapAmazonProduct (html) {
  const image = scraper.scrapImage(html, imageSelector, imageAttribute)
  const title = scraper.scrapText(html, productNameSelector)
  const price = scraper.scrapText(html, priceSelector)
  if (!price || price === 0) {
    // sometimes the selector change if there is a discount in the product
    const newPrice = scraper.scrapText(html, '#priceblock_dealprice')
    return {
      image,
      title,
      price: scraper.currencyStringToNumber(newPrice)
    }
  }
  return { image, title, price: scraper.currencyStringToNumber(price) }
}
