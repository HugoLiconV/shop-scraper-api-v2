import { success, notFound, authorOrAdmin } from '../../services/response/'
import { TrackedProduct } from '.'
import { Product } from '../product'

export const create = ({ user, bodymen: { body } }, res, next) => {
  const product = body.product
  const desiredPrice = body.desiredPrice
  const initialPrice = body.product.price
  const options = { upsert: true, new: true }
  /* Find a product or create it if doesn't exists */
  return Product.findOneAndUpdate({ link: product.link }, product, options)
    .then(product =>
      TrackedProduct.findOneAndUpdate(
        { product: product.id, user: user.id },
        { product, desiredPrice, user, initialPrice, notify: true, wasBought: false },
        options
      )
        .populate('product')
        .then(trackedProduct => trackedProduct.view(true))
    )
    .then(success(res))
    .catch(next)
}

export const index = ({ user, querymen: { query, select, cursor } }, res, next) =>
  TrackedProduct.count({ user: user.id, ...query })
    .then(count =>
      TrackedProduct.find({ user: user.id, ...query }, select, cursor)
        .populate('product')
        .then(trackedProducts => ({
          count,
          products: trackedProducts.map(trackedProduct => trackedProduct.view())
        }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ user, params }, res, next) =>
  TrackedProduct.findById(params.id)
    .populate('product')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then(trackedProduct => (trackedProduct ? trackedProduct.view() : null))
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  TrackedProduct.findById(params.id)
    .populate('product')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then(trackedProduct => (trackedProduct ? Object.assign(trackedProduct, body).save() : null))
    .then(trackedProduct => (trackedProduct ? trackedProduct.view(true) : null))
    .then(success(res))
    .catch(next)

export const localUpdate = (trackedProduct, id) =>
  TrackedProduct.findById(id)
    .then(product => (product ? Object.assign(product, trackedProduct).save() : null))
    .then(product => (product ? product.view(true) : null))

export const destroy = ({ user, params }, res, next) =>
  TrackedProduct.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then(trackedProduct => (trackedProduct ? trackedProduct.remove() : null))
    .then(success(res, 204))
    .catch(next)
