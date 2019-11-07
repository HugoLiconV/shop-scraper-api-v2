import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env, origin, sentryDsn } from '../../config'
const Sentry = require('@sentry/node')

export default (apiRoot, routes) => {
  const app = express()
  Sentry.init({ dsn: sentryDsn, environment: env })

  app.use(require('express-status-monitor')())
  app.use(Sentry.Handlers.requestHandler())

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
