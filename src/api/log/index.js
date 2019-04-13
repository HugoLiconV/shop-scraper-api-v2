import { Router } from 'express'
import { middleware as query, Schema } from 'querymen'
import { index } from './controller'
export Log, { schema } from './model'

const router = new Router()

const schema = new Schema(
  {
    sort: 'createdAt',
    product: {
      type: String,
      paths: ['product'],
      operator: '$eq'
    }
  },
  {
    page: false, // disable default parameter `page`
    limit: 'max_items' // change name of default parameter `limit` to `max_items`
  }
)

/**
 * @api {get} /logs Retrieve logs
 * @apiName RetrieveLogs
 * @apiGroup Log
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of logs.
 * @apiSuccess {Object[]} rows List of logs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query(schema), index)

export default router
