import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes from '.'

const app = () => express(apiRoot, routes)

test('GET /logs 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})
