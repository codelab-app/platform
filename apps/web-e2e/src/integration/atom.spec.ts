import { Page } from '@codelab/frontend/shared'

const appId = 'c83654f1-f89f-48a0-8741-acf91e38c888'
const pageId = '4ccde878-25d3-4b36-a9b8-67fcec986e7b'

describe('Atom', () => {
  before(() => {
    cy.login()

    cy.visit(
      Page.PAGE_DETAIL.url
        .replace('[appId]', appId)
        .replace('[pageId]', pageId),
    )
  })

  it('loads', () => {
    cy.findElementByText('Pages', 'div').should('exist')
  })
})
