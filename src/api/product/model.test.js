import { Product } from '.'

let product

beforeEach(async () => {
  product = await Product.create({
    title: 'test',
    link: 'test',
    image: 'test',
    price: 100,
    store: 'DD Tech'
  })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = product.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.title).toBe(product.title)
    expect(view.link).toBe(product.link)
    expect(view.image).toBe(product.image)
    expect(view.price).toBe(product.price)
    expect(view.store).toBe(product.store)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = product.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.title).toBe(product.title)
    expect(view.link).toBe(product.link)
    expect(view.image).toBe(product.image)
    expect(view.price).toBe(product.price)
    expect(view.store).toBe(product.store)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
