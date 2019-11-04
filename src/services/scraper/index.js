import axios from 'axios'
import cheerio from 'cheerio'

export async function getHTML (url) {
  const response = await axios.get(url, {
    timeout: 5000,
    headers: {
      'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36'
    }
  }).catch(e => {
    console.log('Error getting html', e)
    return Promise.reject(e)
  })
  return response.data
}

export const currencyStringToNumber = string =>
  Number(string.replace(/[^0-9.-]+/g, ''))

export function scrapText (html, selector) {
  const $ = cheerio.load(html)
  const price = $(selector)
    .first()
    .text()
    .trim()
  return price
}

export function scrapImage (html, selector, attr = 'src') {
  const $ = cheerio.load(html)
  const image = $(selector).attr(attr)
  return image
}
