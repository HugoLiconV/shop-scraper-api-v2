import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
import { jwtSecret } from '../../config'

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

export const sign = ({ id, name, email }, options, method = jwtSign) =>
  method({ id, name, email }, jwtSecret, options)

export const signSync = ({ id, name, email }, options) => sign({ id, name, email }, options, jwt.sign)

export const verify = token => jwtVerify(token, jwtSecret)
