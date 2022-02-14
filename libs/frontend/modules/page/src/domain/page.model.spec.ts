import { Page } from './page.model'

describe('Page model', () => {
  it('can create a page', () => {
    const pageData = {
      id: '',
      name: 'Home',
    }

    const page = new Page(pageData)

    expect(page.name).toBe(pageData.name)
  })
})
