import { success, notFound } from '../../services/response/'
import { Product } from '.'
import { getHTML } from '../../services/scraper'
import scrapProductFromStore from '../../services/stores'
import verifyProductData from '../../services/stores/error'
import { getAffiliatedLink } from '../../services/stores/amazon'
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
  const affiliatedLink = getAffiliatedLink(link)
  console.log("TCL: search -> affiliatedLink", affiliatedLink)
  const html = await getHTML(affiliatedLink).catch(error => {
    console.log('[search]: error getting html page', error.message)
    Sentry.captureEvent({
      message: error.message,
      extra: {
        error,
        store,
        link
      }
    })
    return res.status(400).json({message: error.message || 'Error al obtener el producto. Revisa que el link sea correcto.'}).end()
  })
  const product = scrapProductFromStore(store, html)
  try {
    verifyProductData(product)
  } catch (error) {
    Sentry.captureEvent({
      message: error,
      extra: {
        error,
        store,
        link
      }
    })
    return res.status(500).json({message: 'Error al obtener la información del producto. Volver a intentarlo puede solucionarlo. Si no lo hace puedes reportar el problema'}).end()
  }
  return res.status(200).json({
    product: {
      ...product,
      link: affiliatedLink,
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
