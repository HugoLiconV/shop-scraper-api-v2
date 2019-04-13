import { scrapProducts } from '../../services/cron'

export async function runCron (req, res) {
  await scrapProducts()
  res.send({ message: 'runnging Cron' })
}
