import { success } from '../../services/response/'
import { Log } from '.'

export const create = log => Log.create(log).then(log => log.view(true))

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Log.count(query)
    .then(count =>
      Log.find(query, select, { ...cursor, limit: 168 }).then(logs => ({
        count,
        rows: logs.map(log => log.view())
      }))
    )
    .then(success(res))
    .catch(next)
