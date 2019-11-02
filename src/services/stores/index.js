import scrapAmazonProduct from './amazon'
import scrapBestbuyProduct from './bestbuy'
import scrapCoppelProduct from './coppel'
import scrapCostcoProduct from './costco'
import scrapLiverpoolProduct from './liverpool'
import scrapSearsProduct from './sears'
import scrapDDTechProduct from './ddtech'
import scrapCyberpuertaProduct from './cyberpuerta'

export default function scrapProductFromStore (store, html) {
  if (store === 'amazon') {
    return scrapAmazonProduct(html)
  }
  if (store === 'bestbuy') {
    return scrapBestbuyProduct(html)
  }
  if (store === 'coppel') {
    return scrapCoppelProduct(html)
  }

  if (store === 'costco') {
    return scrapCostcoProduct(html)
  }

  if (store === 'liverpool') {
    return scrapLiverpoolProduct(html)
  }

  if (store === 'sears') {
    return scrapSearsProduct(html)
  }

  if (store === 'ddtech') {
    return scrapDDTechProduct(html)
  }

  if (store === 'cyberpuerta') {
    return scrapCyberpuertaProduct(html)
  }
  throw new Error('Store not found')
}
