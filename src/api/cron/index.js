import { Router } from 'express'
import { runCron } from './controller'
const router = new Router()

/**
 * @api {get} /cron Run cron to scrap products
 * @apiName RunCron
 * @apiGroup Cron
 * @apiSuccess {Object[]} message Success message.
 */
router.get('/', runCron)
// TODO: Add permission to run cron (only admins)
export default router
