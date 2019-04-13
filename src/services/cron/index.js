import cron from 'node-cron'
import { runCron } from '../../api/cron/controller'

cron.schedule('*/30 * * * *', () => {
  runCron()
})
