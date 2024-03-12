import type { App } from '@codelab/shared/abstract/codegen'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { slugify } from '@codelab/shared/utils'
import { builderElements, elementRow } from './builder.data'

const updatedElementRow = 'Row Updated'

describe('Elements CRUD', () => {
  let app: IAppDto

  before(() => {
    cy.postApiRequest<App>('/app/seed-cypress-app').then(
      ({ body }) => (app = body),
    )
  })

  describe('create', () => {
    it('should be able to create elements', () => {
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          IPageKindName.Provider,
        )}/builder`,
      )
      cy.waitForSpinners()

      // select root now so we can update its child later
      // there is an issue with tree interaction
      // Increased timeout since builder may take longer to load
      cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
        .should('be.visible')
        .click({ force: true })

      cy.createElementTree(builderElements)
    })
  })

  describe('update', () => {
    it('should be able to update element', () => {
      cy.findByText(elementRow.name).click()
      cy.findByLabelText('Name').clear()
      cy.findByLabelText('Name').type(updatedElementRow)
      cy.findByText(updatedElementRow).should('exist')
    })
  })

  describe('delete', () => {
    it('should be able to delete element sub tree', () => {
      cy.findByText(updatedElementRow).rightclick()
      cy.contains(/Delete/).click({ force: true })
      cy.waitForSpinners()

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(updatedElementRow).should('not.exist')
    })
  })
})
