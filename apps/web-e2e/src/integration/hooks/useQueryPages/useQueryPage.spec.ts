import { beforeHook, selectHook } from './utils'

describe('useQueryPageHook', () => {
  const pageName = 'test'
  const dummyPageName = 'test2'
  const seedPageNames = [pageName, dummyPageName]
  const childElementName = 'root'

  before(() => {
    beforeHook({
      childElementName,
      dummyPageName,
      pageName,
      sourceKey: 'res.data.page.elements.vertices[1].name',
    })
  })

  it('run correctly', () => {
    selectHook({ hook: /HookQueryPage$/, childElementName })

    // select page {pageName}
    cy.getOpenedModal().findByLabelText(/Page/).click()

    // assert item names on the list
    for (const seedPageName of seedPageNames) {
      cy.getOptionItem(seedPageName).should('exist')
    }

    // choose item {pageName} and create

    cy.getOptionItem(pageName).click()
    cy.getOpenedModal().findByText('Add hook').click()
    // // Assert the mapper value
    cy.get('#Builder').findByText('root').should('exist')
  })
})
