import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { TrackedProduct } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, trackedProduct

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  trackedProduct = await TrackedProduct.create({ user })
})

test('POST /tracked-products 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, title: 'test', link: 'test', image: 'test', price: 'test', store: 'test', desiredPrice: 'test', notify: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.link).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.store).toEqual('test')
  expect(body.desiredPrice).toEqual('test')
  expect(body.notify).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /tracked-products 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tracked-products 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].user).toEqual('object')
})

test('GET /tracked-products 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tracked-products/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${trackedProduct.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(trackedProduct.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /tracked-products/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${trackedProduct.id}`)
  expect(status).toBe(401)
})

test('GET /tracked-products/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /tracked-products/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${trackedProduct.id}`)
    .send({ access_token: userSession, title: 'test', link: 'test', image: 'test', price: 'test', store: 'test', desiredPrice: 'test', notify: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(trackedProduct.id)
  expect(body.title).toEqual('test')
  expect(body.link).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.store).toEqual('test')
  expect(body.desiredPrice).toEqual('test')
  expect(body.notify).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /tracked-products/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${trackedProduct.id}`)
    .send({ access_token: anotherSession, title: 'test', link: 'test', image: 'test', price: 'test', store: 'test', desiredPrice: 'test', notify: 'test' })
  expect(status).toBe(401)
})

test('PUT /tracked-products/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${trackedProduct.id}`)
  expect(status).toBe(401)
})

test('PUT /tracked-products/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, title: 'test', link: 'test', image: 'test', price: 'test', store: 'test', desiredPrice: 'test', notify: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tracked-products/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${trackedProduct.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /tracked-products/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${trackedProduct.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /tracked-products/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${trackedProduct.id}`)
  expect(status).toBe(401)
})

test('DELETE /tracked-products/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
