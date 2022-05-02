import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { AtomCreateInput } from '@codelab/shared/abstract/codegen'
import { IAtomType } from '@codelab/shared/abstract/core'
import { createAtomsData } from '@codelab/shared/data'
import { v4 } from 'uuid'
import { FIELD_TYPE } from '../support/antd/form'
import { updatedAppName, updatedPageName } from './app.data'

const ELEMENT_CONTAINER = 'Container'
const ELEMENT_ROW = 'Row'
const ELEMENT_COL_A = 'Col A'
const ELEMENT_COL_B = 'Col B'
const ELEMENT_TEXT = 'Text'
const ELEMENT_BUTTON = 'Button'

type ElementData = { name: string; atom?: string; parentElement: string }

const elements: Array<ElementData> = [
  { name: ELEMENT_CONTAINER, parentElement: ROOT_ELEMENT_NAME },
  { name: ELEMENT_ROW, parentElement: ELEMENT_CONTAINER },
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
    name: ELEMENT_TEXT,
    atom: IAtomType.AntDesignTypographyText,
    parentElement: ELEMENT_COL_A,
  },
  {
    name: ELEMENT_BUTTON,
    atom: IAtomType.AntDesignButton,
    parentElement: ELEMENT_COL_B,
  },
  {
    name: ELEMENT_TEXT,
    atom: IAtomType.AntDesignTypographyText,
    parentElement: ELEMENT_BUTTON,
  },
]

const updatedElementName = 'Container updated'

describe('Elements CRUD', () => {
  before(() => {
    cy.getCurrentUserId().then((userId) => {
      const atomsInput: Array<AtomCreateInput> = createAtomsData.map(
        (atom) => ({
          id: v4(),
          name: atom.name,
          type: atom.type,
          api: {
            create: {
              node: {
                id: v4(),
                name: `${atom.name} API`,
                owner: userId
                  ? { connect: { where: { node: { auth0Id: userId } } } }
                  : undefined,
              },
            },
          },
        }),
      )

      cy.createAtom(atomsInput).then(() => {
        // cy.visit(`/apps/${data.appId}/pages/${data.pageId}/builder`)

        cy.visit('/apps')

        cy.getCard({ title: updatedAppName }).find('a').click()

        cy.url({ timeout: 5000 }).should('include', 'pages')

        cy.contains('a', updatedPageName).click()

        // select root now so we can update its child later
        // there is an issue with tree interaction
        cy.findByText(ROOT_ELEMENT_NAME, { timeout: 6000 })
          .should('be.visible')
          .click({ force: true })
        // cy.findByText(ROOT_ELEMENT_NAME, { timeout: 5000 }).should('exist')
      })
    })
  })

  describe(`create`, () => {
    it(`should be able to create elements`, () => {
      cy.wrap(elements).each((element: ElementData) => {
        const { atom, name, parentElement } = element

        cy.getSider().getButton({ icon: 'plus' }).click()

        cy.getModal().findByLabelText('Name').type(name)

        /**
         * We skip this if parent element is root, since it is disabled and can't be accessed
         */
        if (parentElement !== ROOT_ELEMENT_NAME) {
          cy.getModal().setFormFieldValue({
            label: 'Parent element',
            value: parentElement,
            type: FIELD_TYPE.SELECT,
          })
        }

        if (atom) {
          cy.getModal().setFormFieldValue({
            label: 'Atom',
            value: atom,
            type: FIELD_TYPE.SELECT,
          })
        }

        cy.getModal()
          .getModalAction(/Create/)
          .click()
        cy.getModal().should('not.exist', { timeout: 10000 })
      })
    })
  })

  describe(`update`, () => {
    it(`should be able to update element`, () => {
      cy.findByText('Container').click()
      cy.findByLabelText('Name').clear().type(updatedElementName)
      cy.findByText(updatedElementName).should('exist')
    })
  })

  describe(`delete`, () => {
    it(`should be able to delete element sub tree`, () => {
      cy.findByText(/Container/).rightclick()
      cy.contains(/Delete/).click()
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(/Container/).should('not.exist')
    })
  })
})
