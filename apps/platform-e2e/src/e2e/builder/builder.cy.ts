import { loginAndSetupData } from '@codelab/frontend/test/cypress/nextjs-auth0'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { slugify } from '@codelab/shared/utils'
import { loginSession } from '@codelab/testing/cypress/nextjs-auth0'

const ELEMENT_CONTAINER = 'Container'
const ELEMENT_ROW = 'Row'
const ELEMENT_COL_A = 'Col A'
const ELEMENT_COL_B = 'Col B'
const ELEMENT_TEXT_1 = 'Text 1'
const ELEMENT_TEXT_2 = 'Text 2'
const ELEMENT_BUTTON = 'Button'

const elements = [
  {
    atom: IAtomType.ReactFragment,
    name: ELEMENT_CONTAINER,
    parentElement: ROOT_ELEMENT_NAME,
  },
  {
    atom: IAtomType.ReactFragment,
    name: ELEMENT_ROW,
    parentElement: ELEMENT_CONTAINER,
  },
  {
    atom: IAtomType.AntDesignGridCol,
    name: ELEMENT_COL_A,
    parentElement: ELEMENT_ROW,
  },
  {
    atom: IAtomType.AntDesignGridCol,
    name: ELEMENT_COL_B,
    parentElement: ELEMENT_ROW,
  },
  {
    atom: IAtomType.AntDesignTypographyText,
    name: ELEMENT_TEXT_1,
    parentElement: ELEMENT_COL_A,
  },
  {
    atom: IAtomType.AntDesignButton,
    name: ELEMENT_BUTTON,
    parentElement: ELEMENT_COL_B,
  },
  {
    atom: IAtomType.AntDesignTypographyText,
    name: ELEMENT_TEXT_2,
    parentElement: ELEMENT_BUTTON,
  },
]

const updatedElementName = 'Container Updated'

describe('Elements CRUD', () => {
  let app: IAppDTO
  before(() => {
    loginAndSetupData()

    cy.postApiRequest<IAppDTO>('/app/seed-cypress-app').then((apps) => {
      app = apps.body
    })
  })
  describe('create', () => {
    it('should be able to create elements', () => {
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          IPageKindName.Provider,
        )}/builder`,
      )
      cy.getSpinner().should('not.exist')

      // select root now so we can update its child later
      // there is an issue with tree interaction
      // Increased timeout since builder may take longer to load
      cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
        .should('be.visible')
        .click({ force: true })

      cy.createElementTree(elements)
    })
  })

  describe('update', () => {
    it(`should be able to update element`, () => {
      cy.findByText(ELEMENT_CONTAINER).click()
      cy.findByLabelText('Name').clear()
      cy.findByLabelText('Name').type(updatedElementName)
      cy.findByText(updatedElementName).should('exist')
    })
  })

  describe('delete', () => {
    it(`should be able to delete element sub tree`, () => {
      cy.findByText(updatedElementName).rightclick()
      cy.contains(/Delete/).click({ force: true })
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(updatedElementName).should('not.exist')
    })
  })
})
