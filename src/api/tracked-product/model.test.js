import { TrackedProduct } from '.'
import { User } from '../user'

let user, trackedProduct

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  trackedProduct = await TrackedProduct.create({ user, title: 'test', link: 'test', imageUrl: 'test', price: 'test', store: 'test', desiredPrice: 'test', notify: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = trackedProduct.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(trackedProduct.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(trackedProduct.title)
    expect(view.link).toBe(trackedProduct.link)
    expect(view.imageUrl).toBe(trackedProduct.imageUrl)
    expect(view.price).toBe(trackedProduct.price)
    expect(view.store).toBe(trackedProduct.store)
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
    expect(view.title).toBe(trackedProduct.title)
    expect(view.link).toBe(trackedProduct.link)
    expect(view.imageUrl).toBe(trackedProduct.imageUrl)
    expect(view.price).toBe(trackedProduct.price)
    expect(view.store).toBe(trackedProduct.store)
    expect(view.desiredPrice).toBe(trackedProduct.desiredPrice)
    expect(view.notify).toBe(trackedProduct.notify)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
