import { TrackedProduct } from '.'
import { User } from '../user'
import { Product } from '../product'

let user, trackedProduct, product

beforeEach(async () => {
  product = await Product.create({
    title: 'test',
    link: 'test',
    imageUrl: 'test',
    price: 100,
    store: 'DD Tech'
  })
  user = await User.create({ email: 'a@a.com', password: '123456' })
  trackedProduct = await TrackedProduct.create({ user, product, desiredPrice: 90, notify: true })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = trackedProduct.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(trackedProduct.id)
    expect(view.product.id).toBe(product.id)
    expect(view.desiredPrice).toBe(trackedProduct.desiredPrice)
    expect(view.notify).toBe(trackedProduct.notify)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = trackedProduct.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(trackedProduct.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.product.id).toBe(product.id)
    expect(view.desiredPrice).toBe(trackedProduct.desiredPrice)
    expect(view.notify).toBe(trackedProduct.notify)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
