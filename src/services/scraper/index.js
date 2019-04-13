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

export function scrapPriceCyberPuerta (html) {
  const $ = cheerio.load(html)
  const price = $('span[class=priceText]')
    .first()
    .text()
    .trim()
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
