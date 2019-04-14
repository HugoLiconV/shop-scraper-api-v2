import { Router } from 'express'
import { middleware as query } from 'querymen'
import { index } from './controller'
const router = new Router()

/**
 * @api {get} /search Search for products
 * @apiName SearchProducts
 * @apiGroup Search
 * @apiUse listParams
 * @apiParam {String} [term] Term to search.
 * @apiSuccess {String} itemsFound Total amount of products.
 * @apiSuccess {Object[]} data List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query(), index)

export default router
