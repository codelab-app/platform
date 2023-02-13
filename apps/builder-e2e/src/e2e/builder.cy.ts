import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { AtomCreateInput } from '@codelab/shared/abstract/codegen'
import { IAtomType } from '@codelab/shared/abstract/core'
import { createAtomsData } from '@codelab/shared/data/test'
import { connectOwner } from '@codelab/shared/domain/mapper'
import { v4 } from 'uuid'
import { FIELD_TYPE } from '../support/antd/form'
import { createAppInput } from '../support/database/app'

const ELEMENT_CONTAINER = 'container'
const ELEMENT_ROW = 'row'
const ELEMENT_COL_A = 'col a'
const ELEMENT_COL_B = 'col b'
const ELEMENT_TEXT_1 = 'text 1'
const ELEMENT_TEXT_2 = 'text 2'
const ELEMENT_BUTTON = 'button'

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
    name: ELEMENT_COL_A,
    atom: IAtomType.AntDesignGridCol,
    parentElement: ELEMENT_ROW,
  },
  {
    name: ELEMENT_COL_B,
    atom: IAtomType.AntDesignGridCol,
    parentElement: ELEMENT_ROW,
  },
  {
    name: ELEMENT_TEXT_1,
    atom: IAtomType.AntDesignTypographyText,
    parentElement: ELEMENT_COL_A,
  },
  {
    name: ELEMENT_BUTTON,
    atom: IAtomType.AntDesignButton,
    parentElement: ELEMENT_COL_B,
  },
  {
    name: ELEMENT_TEXT_2,
    atom: IAtomType.AntDesignTypographyText,
    parentElement: ELEMENT_BUTTON,
  },
]

const updatedElementName = 'container updated'

describe('Elements CRUD', () => {
  before(() => {
    cy.resetDatabase()
    cy.login()
    cy.getCurrentUserId()
      .then((userId) => {
        const atomsInput: Array<AtomCreateInput> = createAtomsData().map(
          (atom) => ({
            id: v4(),
            name: atom.name,
            type: atom.type,
            api: {
              create: {
                node: {
                  id: v4(),
                  name: `${atom.name} API`,
                  owner: userId ? connectOwner(userId) : undefined,
                },
              },
            },
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
        value: ROOT_ELEMENT_NAME,
        type: FIELD_TYPE.SELECT,
      })

      cy.getModal().setFormFieldValue({
        label: 'Atom',
        value: IAtomType.AntDesignTypographyText,
        type: FIELD_TYPE.SELECT,
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

  describe(`update`, () => {
    it(`should be able to update element`, () => {
      cy.findByText('container').click()
      cy.findByLabelText('Name').clear().type(updatedElementName)
      cy.findByText(updatedElementName).should('exist')
    })
  })

  describe(`delete`, () => {
    it(`should be able to delete element sub tree`, () => {
      cy.findByText(/container/).rightclick()
      cy.contains(/Delete/).click({ force: true })
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(/container/).should('not.exist')
    })
  })
})
