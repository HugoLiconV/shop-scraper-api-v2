import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Product } from '.'

const app = () => express(apiRoot, routes)

let product

beforeEach(async () => {
  product = await Product.create({})
})

test('POST /products 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ title: 'test', link: 'test', image: 'test', price: 'test', store: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.link).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.store).toEqual('test')
})

test('GET /products 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /products/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${product.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(product.id)
})

test('GET /products/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /products/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${product.id}`)
    .send({ title: 'test', link: 'test', image: 'test', price: 'test', store: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(product.id)
  expect(body.title).toEqual('test')
  expect(body.link).toEqual('test')
  expect(body.image).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.store).toEqual('test')
})

test('PUT /products/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ title: 'test', link: 'test', image: 'test', price: 'test', store: 'test' })
  expect(status).toBe(404)
})

test('DELETE /products/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${product.id}`)
  expect(status).toBe(204)
})

test('DELETE /products/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
