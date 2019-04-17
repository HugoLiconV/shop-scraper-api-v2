import { scrapProducts } from '../../services/cron'

export const runCron = async (req, res) => {
  await scrapProducts()
  res.send({ message: 'runnging Cron' })
}
