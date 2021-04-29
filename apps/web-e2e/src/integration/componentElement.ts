import { randomAtomType } from '../support/testUtils'
import {
  AtomFragment,
  CreateComponentElementGql,
  GetComponents__ComponentFragment,
  PageElement__ComponentElementFragment,
} from '@codelab/hasura'
import { print } from 'graphql'

const getComponentElementInTree = (label: string) =>
  cy.findByTestId('pane-main').find('.ant-tree-list').findByText(label)

const getAndExpandElementInTree = (label: string) =>
  getComponentElementInTree(label)
    .first()
    .closest('div')
    .findByLabelText('caret-down')
    .click() //Click on the caret next to the element in the tree to expand it

describe('Component element', () => {
  let libraryId: string
  let component: GetComponents__ComponentFragment
  let atom: AtomFragment

  before(() => {
    cy.clearCookies()

    cy.login().then(() => {
      cy.createLibrary().then((l) => {
        libraryId = l.id

        cy.createComponent(libraryId).then((c) => {
          component = c
        })

        const atomType = randomAtomType()

        cy.deleteAllAtoms()
        cy.createAtom(atomType).then((a) => {
          atom = a
        })
      })
    })
  })

  beforeEach(() => {
    cy.intercept('/api/graphql').as('graphql')
    Cypress.Cookies.preserveOnce('appSession')
  })

  const createComponentElement = (label: string) =>
    cy
      .hasuraAdminRequest({
        query: print(CreateComponentElementGql),
        variables: {
          input: {
            component_id: component.id,
            atom_id: atom.id,
            label,
          },
        },
      })
      .then(
        (r) =>
          r.body.data
            .insert_component_element_one as PageElement__ComponentElementFragment,
      )

  const openComponentsTab = () => {
    cy.visit(`/components/${component.id}`)
  }

  it('creates root component elements', () => {
    //Setup
    const label = 'Best element ever'

    openComponentsTab()

    //Create the component element
    cy.findMainPanelHeaderPlusButton().click() //Click the plus button in the tab header
    cy.getOpenedModal().findByLabelText('Label').clear().type(label)
    cy.getOpenedModal().findByLabelText('Atom').click()
    cy.getSelectOptionItemByValue(atom.type).first().click()
    cy.getOpenedModal()
      .findByRole('button', { name: 'Create component element' })
      .click() //Click the submit button

    cy.wait('@graphql') //Wait for the request to finish

    //Validate component element is created
    cy.getOpenedModal().should('not.exist') //modal should close

    getAndExpandElementInTree(component.label + ' Root')
    getComponentElementInTree(label) //We should have the new item in the tree
  })

  it.only('creates nested component elements', () => {
    //Setup
    const parentLabel = 'Best element ever'
    const childLabel = "Best element's child"

    createComponentElement(parentLabel).then((parentElement) => {
      openComponentsTab()

      getAndExpandElementInTree(component.label + ' Root')

      cy.findByTestId('pane-main')
        .find('.ant-tree-list .ant-tree-treenode-motion')
        .should('not.exist') //Wait for the expanding animation to finish

      getComponentElementInTree(parentElement.label).first().click()

      cy.getByTestId('pane-config')
        .findByRole('button', { name: 'Insert child element' })
        .click()

      //Create the component element
      cy.getOpenedModal().findByLabelText('Label').clear().type(childLabel)
      cy.getOpenedModal().findByLabelText('Atom').click()
      cy.getSelectOptionItemByValue(atom.type).first().click()
      cy.getOpenedModal().findByRole('button', { name: 'Create' }).click() //Click the submit button

      cy.wait('@graphql') //Wait for the request to finish

      //Validate component element is created
      cy.getOpenedModal().should('not.exist') //modal should close

      getAndExpandElementInTree(parentLabel)
      getComponentElementInTree(childLabel) //We should have the new item in the tree
    })
  })
})
