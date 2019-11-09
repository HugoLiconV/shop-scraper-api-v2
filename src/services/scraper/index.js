import axios from 'axios'
import cheerio from 'cheerio'

const listOfUserAgens = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A',
  'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0']

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function getHTML (url) {
  const randomInt = getRandomInt(0, listOfUserAgens.length - 1)
  const userAgent = listOfUserAgens[randomInt]
  console.log("TCL: getHTML -> userAgent", userAgent)
  const response = await axios.get(url, {
    timeout: 5000,
    headers: {
      'User-Agent': userAgent
    }
  }).catch(e => {
    console.log('Error getting html', e.message)

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      message: e.message,
      reason: e.message,
      url,
      userAgent
    })
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
