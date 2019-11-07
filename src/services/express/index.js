import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env, origin } from '../../config'

export default (apiRoot, routes) => {
  const app = express()

  app.use(require('express-status-monitor')())

  const corsOptions = {
    origin: env === 'production' ? origin : 'http://localhost:3000'
  }
  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors(corsOptions))
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
