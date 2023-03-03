import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { AtomCreateInput } from '@codelab/shared/abstract/codegen'
import { IAtomType } from '@codelab/shared/abstract/core'
import { createAtomsData } from '@codelab/shared/data/test'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import { v4 } from 'uuid'
import { FIELD_TYPE } from '../support/antd/form'
import { createAppInput } from '../support/database/app'
import { loginSession } from '../support/nextjs-auth0/commands/login'

const ELEMENT_CONTAINER = 'Container'
const ELEMENT_ROW = 'Row'
const ELEMENT_COL_A = 'Col A'
const ELEMENT_COL_B = 'Col B'
const ELEMENT_TEXT_1 = 'Text 1'
const ELEMENT_TEXT_2 = 'Text 2'
const ELEMENT_BUTTON = 'Button'

const elements = [
  {
    name: ELEMENT_CONTAINER,
    parentElement: ROOT_ELEMENT_NAME,
  },
  {
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
  before(() => {
    cy.resetDatabase()
    loginSession()
    cy.getCurrentUserId()
      .then((userId) => {
        const atomsInput: Array<AtomCreateInput> = createAtomsData().map(
          (atom) => ({
            api: {
              create: {
                node: {
                  id: v4(),
                  name: `${atom.name} API`,
                  owner: userId ? connectAuth0Owner(userId) : undefined,
                },
              },
            },
            id: v4(),
            name: atom.name,
            type: atom.type,
          }),
        )

        cy.createAtom(atomsInput)

        return cy.createApp(createAppInput(userId))
      })
      .then((apps) => {
        const app = apps[0]
        const pageId = app?.pages[0]?.id
        cy.visit(`/apps/${app?.id}/pages/${pageId}/builder`)
        cy.getSpinner().should('not.exist')

        // select root now so we can update its child later
        // there is an issue with tree interaction
        // Increased timeout since builder may take longer to load
        cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
          .should('be.visible')
          .click({ force: true })
      })
  })

  describe('create', () => {
    it('should be able to create elements', () => {
      cy.createElementTree(elements)
    })

    it.skip('should be able to view props', () => {
      cy.getSider()
        .find('.ant-page-header-heading')
        .getButton({ icon: 'plus' })
        .click()

      cy.getModal().findByLabelText('Name').type(ELEMENT_TEXT_1)

      cy.getModal().setFormFieldValue({
        label: 'Parent element',
        type: FIELD_TYPE.SELECT,
        value: ROOT_ELEMENT_NAME,
      })

      cy.getModal().setFormFieldValue({
        label: 'Atom',
        type: FIELD_TYPE.SELECT,
        value: IAtomType.AntDesignTypographyText,
      })

      cy.getModal()
        .getModalAction(/Create/)
        .click()
      cy.getModal().should('not.exist', { timeout: 10000 })

      cy.contains(/Text.*/).click()

      cy.get(`[aria-label="setting"]`).click()

      cy.findByText('Custom Text').should('exist')
      cy.findByText(/Edit.*API/).should('exist')
    })
  })

  describe('update', () => {
    it(`should be able to update element`, () => {
      cy.findByText(ELEMENT_CONTAINER).click()
      cy.findByLabelText('Name').clear().type(updatedElementName)
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
