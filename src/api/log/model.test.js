import { Log } from '.'
import { Product } from '../product'

let log
let product

beforeEach(async () => {
  product = await Product.create({ title: 'a', link: 'a.com', price: 1000, store: 'DD Tech' })
  log = await Log.create({ product: product.id, price: 1100 })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = log.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(log.id)
    expect(view.product.id).toBe(product.id)
    expect(view.price).toBe(log.price)
    expect(view.createdAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = log.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(log.id)
    expect(view.product.id).toBe(product.id)
    expect(view.price).toBe(log.price)
    expect(view.createdAt).toBeTruthy()
  })
})
