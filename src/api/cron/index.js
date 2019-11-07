import { Router } from 'express'
import { runCron } from './controller'
import { token } from '../../services/passport'
const router = new Router()

/**
 * @api {get} /cron Run cron to scrap products
 * @apiName RunCron
 * @apiGroup Cron
 * @apiSuccess {Object[]} message Success message.
 */
router.get('/', token({ required: true, roles: ['admin'] }), runCron)

export default router
