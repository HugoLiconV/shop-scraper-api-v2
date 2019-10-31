import axios from 'axios'
import cheerio from 'cheerio'

export async function getHTML (url) {
  const { data: html } = await axios.get(url)
  return html
}

const currencyToNumber = string => Number(string.replace(/[^0-9.-]+/g, ''))

export function findItemInfoDDTech (html) {
  const $ = cheerio.load(html)
  const selector = '.product'
  const result = []
  $(selector).map(function (i, item) {
    const title = $(this)
      .find('div[class=image] a')
      .attr('title')
      .trim()
    const link = $(this)
      .find('div[class=image] a')
      .attr('href')

    const price = $(this)
      .find('span[class=price]')
      .text()
      .trim()

    const imageUrl = $(this)
      .find('div[class=image] a img')
      .attr('data-echo')
    result[i] = {
      title,
      link,
      imageUrl,
      price: currencyToNumber(price),
      store: 'DD Tech'
    }
  })

  return result
}

export function findItemInfoCyberPuerta (html) {
  const $ = cheerio.load(html)
  const selector = '.productData'
  const result = []

  $(selector).each(function (i, item) {
    const title = $(this)
      .find('.emproduct_right_title span')
      .text()
      .trim()

    const link = $(this)
      .find('.emproduct_right_title')
      .attr('href')

    const price = $(this)
      .find('label[class=price] span')
      .text()
      .trim()

    // You can't get the imageUrl
    result[i] = {
      title,
      link,
      imageUrl: null,
      price: currencyToNumber(price),
      store: 'Cyber Puerta'
    }
  })

  return result
}

export function findItemInfoAmazon (html) {
  const $ = cheerio.load(html)
  const selector = '[data-index]'
  const result = []

  $(selector).each(function (i, item) {
    const title = $(this)
      .find('h5 a.a-link-normal.a-text-normal span')
      .text()
      .trim()

    const link = $(this)
      .find('h5 a.a-link-normal.a-text-normal')
      .attr('href')

    const price = $(this)
      .find('span[data-a-color="base"] span.a-offscreen')
      .text()
      .trim()

    const imageUrl = $(this)
      .find('[data-image-index]')
      .attr('src')

    result[i] = {
      title,
      imageUrl,
      link: `https://www.amazon.com.mx${link}`,
      price: currencyToNumber(price),
      store: 'Amazon'
    }
  })

  return result
}

function addAffiliateLink (url) {
  const affiliateInfo = '&_encoding=UTF8&tag=shopscraper-20&linkCode=ur2&camp=1789&creative=9325'
  return `${url}${affiliateInfo}`
}

export function scrapPriceCyberPuerta (html) {
  const $ = cheerio.load(html)
  const price = $('span[class=priceText]')
    .first()
    .text()
    .trim()
  const img = $('a[class=emzoompics] > img').attr('src')
  return { img, price: currencyToNumber(price) }
}

export function scrapPriceAmazon (html) {
  console.log('TCL: scrapPriceAmazon -> html', html)
  const $ = cheerio.load(html)
  const price = $('#priceblock_ourprice')
    .first()
    .text()
    .trim()

  console.log('TCL: scrapPriceAmazon -> price', price)
  return currencyToNumber(price)
}

export function scrapPriceDDTech (html) {
  const $ = cheerio.load(html)
  const price = $('span[class=price]')
    .first()
    .text()
    .trim()
  return currencyToNumber(price)
}
