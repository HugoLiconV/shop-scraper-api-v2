import { Log } from '.'

let log

beforeEach(async () => {
  log = await Log.create({ product: 'test', price: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = log.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(log.id)
    expect(view.product).toBe(log.product)
    expect(view.price).toBe(log.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = log.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(log.id)
    expect(view.product).toBe(log.product)
    expect(view.price).toBe(log.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
