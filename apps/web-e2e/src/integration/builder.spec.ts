//
// Ignored because of a cypress issue https://github.com/codelab-ai/codelab.ai/issues/1172
//

import { AtomType } from '@codelab/shared/abstract/core'
import { TIMEOUT } from '../support/timeout'

// Atoms
const atoms = [
  { name: 'Col', type: AtomType.AntDesignGridCol },
  { name: 'Row', type: AtomType.AntDesignGridRow },
  { name: 'Button', type: AtomType.AntDesignButton },
  { name: 'Text', type: AtomType.AntDesignTypographyText },
]

// Page
const pageName = 'Home Page'

// Page components
const components = [
  { name: 'Row', atom: 'Row', parentElement: 'Root element' },
  { name: 'Col A', atom: 'Col', parentElement: 'Row' },
  { name: 'Col B', atom: 'Col', parentElement: 'Row' },
  { name: 'Text', atom: 'Text', parentElement: 'Col A' },
  { name: 'Button', atom: 'Button', parentElement: 'Col B' },
  { name: 'Text', atom: 'Text', parentElement: 'Button' },
]

const findDeleteButtonByAtomName = (text: string) =>
  cy
    .findByText(text, { exact: true, timeout: TIMEOUT })
    .closest('.ant-table-row')
    .find('.anticon-delete')
    .closest('button')

let appId: string

before(() => {
  cy.resetDgraphData().then(() => {
    cy.login().then(() => {
      cy.preserveAuthCookies()
      cy.createApp().then((app: any) => {
        appId = app.id
      })
    })
  })
})

beforeEach(() => {
  cy.preserveAuthCookies()
})

describe(`Create atoms`, () => {
  before(() => {
    cy.visit(`/atoms`)
    cy.get('.ant-table-cell', { timeout: TIMEOUT })
  })

  it(`should be able to create atoms`, () => {
    cy.wrap(atoms).each((atom: { name: string; type: AtomType }) => {
      const atomName = atom.name
      const atomType = atom.type

      cy.findAllByText(atomName, { exact: true, timeout: TIMEOUT }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/ }).click()

      cy.getOpenedModal().findByLabelText('Name').type(atomName)
      cy.getOpenedModal().findByLabelText('Type').type(atomType)
      cy.getSelectOptionItemByValue(atomType).first().click()
      cy.getOpenedModal()
        .findByButtonText(/Create Atom/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(atomName).should('exist')
    })
  })
})

describe('Create page', () => {
  it('should create a page', () => {
    cy.visit(`/apps/${appId}/pages`)
    cy.getSpinner().should('not.exist')

    cy.findAllByText(pageName, { exact: true, timeout: TIMEOUT }).should(
      'not.exist',
    )

    cy.findByRole('button', { name: /plus/ }).click()

    cy.getOpenedModal().findByLabelText('Name').type(pageName)
    cy.getOpenedModal()
      .findByButtonText(/Create Page/)
      .click()

    cy.getOpenedModal().should('not.exist')
    cy.findByText(pageName).should('exist')

    // Go to page
    cy.findByText(pageName).click()
    cy.contains(/Root element/)
  })
})

// Add Row component
describe(`Create components`, () => {
  it(`should be able to add component `, () => {
    cy.wrap(components).each(
      (component: { name: string; atom: string; parentElement: string }) => {
        const componentName = component.name
        const componentAtom = component.atom
        const componentParentElement = component.parentElement

        cy.findByRole('button', { name: /plus/ }).click()

        cy.getOpenedModal().findByLabelText('Name').type(componentName)
        cy.getOpenedModal().findByLabelText('Atom').type(componentAtom)
        cy.getOpenedModal().getOptionItem(componentAtom).first().click()
        cy.getOpenedModal()
          .findByLabelText('Parent element')
          .click({ force: true })
          .type(componentParentElement, { force: true })
        cy.getOpenedModal()
          .getOptionItem(componentParentElement)
          .first()
          .click()

        cy.getOpenedModal()
          .findByButtonText(/Create/)
          .click()

        cy.getOpenedModal().should('not.exist')
      },
    )
  })
})

describe('Delete page', () => {
  before(() => {
    cy.visit(`/apps/${appId}/pages`)
    cy.getSpinner().should('not.exist')
  })

  it('should be able to delete home page', () => {
    cy.findAllByText(pageName, { exact: true, timeout: TIMEOUT }).should(
      'exist',
    )

    cy.findDeleteButtonByPageName(pageName).click()

    cy.getSpinner().should('not.exist')
    cy.getOpenedModal()
      .findByButtonText(/Delete Page/)
      .click()

    cy.findAllByText(pageName).should('not.exist')
  })
})

describe('Delete atoms', () => {
  before(() => {
    cy.visit(`/atoms`)
    cy.get('.ant-table-cell', { timeout: TIMEOUT })
  })

  it('should be able to delete atoms', () => {
    cy.wrap(atoms).each((atom: { name: string; type: AtomType }) => {
      const atomName = atom.name
      const atomType = atom.type

      findDeleteButtonByAtomName(atomName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete Atom/)
        .click()

      cy.findAllByText(atomName).should('not.exist')
    })
  })
})
