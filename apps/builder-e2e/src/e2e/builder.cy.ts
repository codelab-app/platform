import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import {
  AppCreateInput,
  AtomCreateInput,
} from '@codelab/shared/abstract/codegen'
import { IAtomType } from '@codelab/shared/abstract/core'
import { connectOwner, createAtomsData } from '@codelab/shared/data'
import slugify from 'slugify'
import { v4 } from 'uuid'
import { FIELD_TYPE } from '../support/antd/form'
import { createAppInput } from '../support/database/app'
import { createPageInput } from '../support/database/page'

const ELEMENT_CONTAINER = 'Container'
const ELEMENT_ROW = 'Row'
const ELEMENT_COL_A = 'Col A'
const ELEMENT_COL_B = 'Col B'
const ELEMENT_TEXT = 'Text'
const ELEMENT_BUTTON = 'Button'

const elements = [
  {
    name: ELEMENT_CONTAINER,
    parentElement: ROOT_ELEMENT_NAME,
    slug: slugify(ELEMENT_CONTAINER),
  },
  {
    name: ELEMENT_ROW,
    parentElement: ELEMENT_CONTAINER,
    slug: slugify(ELEMENT_ROW),
  },
  {
    name: ELEMENT_COL_A,
    atom: IAtomType.AntDesignGridCol,
    parentElement: ELEMENT_ROW,
    slug: slugify(ELEMENT_COL_A),
  },
  {
    name: ELEMENT_COL_B,
    atom: IAtomType.AntDesignGridCol,
    parentElement: ELEMENT_ROW,
    slug: slugify(ELEMENT_COL_B),
  },
  {
    name: ELEMENT_TEXT,
    atom: IAtomType.AntDesignTypographyText,
    parentElement: ELEMENT_COL_A,
    slug: slugify(ELEMENT_TEXT),
  },
  {
    name: ELEMENT_BUTTON,
    atom: IAtomType.AntDesignButton,
    parentElement: ELEMENT_COL_B,
    slug: slugify(ELEMENT_BUTTON),
  },
  {
    name: ELEMENT_TEXT,
    atom: IAtomType.AntDesignTypographyText,
    parentElement: ELEMENT_BUTTON,
    slug: slugify(`${ELEMENT_TEXT}_1`),
  },
]

const updatedElementName = 'Container updated'

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

        const initialAppInput = createAppInput(userId)

        const appInput: AppCreateInput = {
          ...initialAppInput,
          pages: {
            create: [{ node: createPageInput(initialAppInput.id) }],
          },
        }

        return cy.createApp(userId, appInput)
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

      cy.getModal().findByLabelText('Name').type(ELEMENT_TEXT)
      cy.getModal().findByLabelText('Slug').type(`${ELEMENT_TEXT}_2`)

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
      cy.findByText('Container').click()
      cy.findByLabelText('Name').clear().type(updatedElementName)
      cy.findByText(updatedElementName).should('exist')
    })
  })

  describe(`delete`, () => {
    it(`should be able to delete element sub tree`, () => {
      cy.findByText(/Container/).rightclick()
      cy.contains(/Delete/).click({ force: true })
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findByText(/Container/).should('not.exist')
    })
  })
})
