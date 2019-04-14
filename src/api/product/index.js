import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
import { token } from '../../services/passport'
export Product, { schema } from './model'

const router = new Router()
const { title, link, imageUrl, price, store } = schema.tree

/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiParam title Product's title.
 * @apiParam link Product's link.
 * @apiParam imageUrl Product's imageUrl.
 * @apiParam price Product's price.
 * @apiParam store Product's store.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 Admin access only.
 */
router.post(
  '/',
  token({ required: true, roles: ['admin'] }),
  body({ title, link, imageUrl, price, store }),
  create
)

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/', token({ required: true, roles: ['admin'] }), query(), index)

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 Admin access only.
 */
router.get('/:id', token({ required: true, roles: ['admin'] }), show)

/**
 * @api {put} /products/:id Update product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiParam title Product's title.
 * @apiParam link Product's link.
 * @apiParam imageUrl Product's imageUrl.
 * @apiParam price Product's price.
 * @apiParam store Product's store.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 Admin access only.
 */
router.put(
  '/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title, link, imageUrl, price, store }),
  update
)

/**
 * @api {delete} /products/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 * @apiError 401 Admin access only.
 */
router.delete('/:id', token({ required: true, roles: ['admin'] }), destroy)

export default router
