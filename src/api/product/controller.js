import { success, notFound } from '../../services/response/'
import { Product } from '.'
import { getHTML } from '../../services/scraper'
import scrapProductFromStore from '../../services/stores'
import verifyProductData from '../../services/stores/error'
const Sentry = require('@sentry/node')

export const create = ({ bodymen: { body } }, res, next) =>
  Product.create(body)
    .then(product => product.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Product.find(query, select, cursor)
    .then(products => products.map(product => product.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then(product => (product ? product.view() : null))
    .then(success(res))
    .catch(next)

export const search = async ({ query: {store, link} }, res, next) => {
  const html = await getHTML(link).catch(error => {
    console.log('[search]: error getting html page', error.message)
    Sentry.captureEvent({
      error,
      store,
      link
    })
    res.status(400).json({message: error.message || 'Error al obtener el producto. Revisa que el link sea correcto.'}).end()
  })
  const product = scrapProductFromStore(store, html)
  try {
    verifyProductData(product)
  } catch (error) {
    Sentry.captureEvent({
      error,
      store,
      link
    })
    res.status(500).json({message: error || 'Error al obtener la información del producto. Vuelve a intentarlo'}).end()
  }
  return res.status(200).json({
    product: {
      ...product,
      link,
      store
    }
  })
}

export const update = (newProduct, id) =>
  Product.findById(id)
    .then(product => (product ? Object.assign(product, newProduct).save() : null))
    .then(product => (product ? product.view(true) : null))

export const destroy = ({ params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then(product => (product ? product.remove() : null))
    .then(success(res, 204))
    .catch(next)
