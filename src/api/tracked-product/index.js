import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export TrackedProduct, { schema } from './model'

const router = new Router()
const { product, desiredPrice } = schema.tree

/**
 * @api {post} /tracked-products Create tracked product
 * @apiName CreateTrackedProduct
 * @apiGroup TrackedProduct
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Tracked product's title.
 * @apiParam link Tracked product's link.
 * @apiParam imageUrl Tracked product's imageUrl.
 * @apiParam price Tracked product's price.
 * @apiParam store Tracked product's store.
 * @apiParam desiredPrice Tracked product's desiredPrice.
 * @apiParam notify Tracked product's notify.
 * @apiSuccess {Object} trackedProduct Tracked product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tracked product not found.
 * @apiError 401 user access only.
 */
router.post('/', token({ required: true }), body({ product: [Object], desiredPrice }), create)

/**
 * @api {get} /tracked-products Retrieve tracked products
 * @apiName RetrieveTrackedProducts
 * @apiGroup TrackedProduct
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of tracked products.
 * @apiSuccess {Object[]} rows List of tracked products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/', token({ required: true }), query(), index)

/**
 * @api {get} /tracked-products/:id Retrieve tracked product
 * @apiName RetrieveTrackedProduct
 * @apiGroup TrackedProduct
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} trackedProduct Tracked product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tracked product not found.
 * @apiError 401 user access only.
 */
router.get('/:id', token({ required: true }), show)

/**
 * @api {put} /tracked-products/:id Update tracked product
 * @apiName UpdateTrackedProduct
 * @apiGroup TrackedProduct
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Tracked product's title.
 * @apiParam link Tracked product's link.
 * @apiParam imageUrl Tracked product's imageUrl.
 * @apiParam price Tracked product's price.
 * @apiParam store Tracked product's store.
 * @apiParam desiredPrice Tracked product's desiredPrice.
 * @apiParam notify Tracked product's notify.
 * @apiSuccess {Object} trackedProduct Tracked product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Tracked product not found.
 * @apiError 401 user access only.
 */
router.put('/:id', token({ required: true }), body({ desiredPrice }), update)

/**
 * @api {delete} /tracked-products/:id Delete tracked product
 * @apiName DeleteTrackedProduct
 * @apiGroup TrackedProduct
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Tracked product not found.
 * @apiError 401 user access only.
 */
router.delete('/:id', token({ required: true }), destroy)

export default router
