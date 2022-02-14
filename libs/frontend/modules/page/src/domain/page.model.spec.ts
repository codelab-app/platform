import { Page } from './page.model'

describe('Page model', () => {
  const pageData = {
    id: '',
    name: 'Home',
  }

  it('can create a page', () => {
    const page = new Page(pageData)

    expect(page.name).toBe(pageData.name)
    // Page should be created with a default element graph
    expect(page.elements).toBeDefined()
  })

  it('can add an element', () => {
    const page = new Page(pageData)

    // page.addElement()
  })
})
