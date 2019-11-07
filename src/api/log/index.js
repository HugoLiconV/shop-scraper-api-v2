import { Router } from 'express'
import { middleware as query, Schema } from 'querymen'
import { index } from './controller'
import { token } from '../../services/passport'
export Log, { schema } from './model'

const router = new Router()

const schema = new Schema({
  sort: '-createdAt',
  product: {
    type: String,
    paths: ['product'],
    operator: '$eq'
  }
})

/**
 * @api {get} /logs Retrieve logs
 * @apiName RetrieveLogs
 * @apiGroup Log
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of logs.
 * @apiSuccess {Object[]} rows List of logs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', token({ required: true }), query(schema), index)

export default router
