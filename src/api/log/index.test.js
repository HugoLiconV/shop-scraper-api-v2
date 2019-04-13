import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Log } from '.'

const app = () => express(apiRoot, routes)

let log

beforeEach(async () => {
  log = await Log.create({})
})

test('POST /logs 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ product: 'test', price: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.product).toEqual('test')
  expect(body.price).toEqual('test')
})

test('GET /logs 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})
