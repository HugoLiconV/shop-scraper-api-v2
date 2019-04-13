import { success } from '../../services/response/'
import { Log } from '.'

export const create = log => Log.create(log).then(log => log.view(true))

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  console.log('TCL: index -> query', query)
  console.log('TCL: index -> select', select)
  console.log('TCL: index -> cursor', cursor)

  return Log.count(query)
    .then(count =>
      Log.find(query, select, cursor)
        .populate('product')
        .then(logs => ({
          count,
          rows: logs.map(log => log.view())
        }))
    )
    .then(success(res))
    .catch(next)
}
