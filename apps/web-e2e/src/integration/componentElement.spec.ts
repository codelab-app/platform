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

const getAndExpandElementInTree = (label: string) => {
  getComponentElementInTree(label)
    .first()
    .closest('div')
    .findByLabelText('caret-down') //Click on the caret next to the element in the tree to expand it
    .click()

  cy.findByTestId('pane-main')
    .find('.ant-tree-list .ant-tree-treenode-motion')
    .should('not.exist') //Wait for the expanding animation to finish
}

describe('Component element', () => {
  let libraryId: string
  let component: GetComponents__ComponentFragment
  let atom: AtomFragment

  before(() => {
    cy.clearCookies()

    cy.login().then(() => {
      cy.createLibrary().then((l) => {
        libraryId = l.id

        cy.deleteAllAtoms()
      })
    })
  })

  beforeEach(() => {
    cy.intercept('/api/graphql').as('graphql')
    Cypress.Cookies.preserveOnce('appSession')

    cy.createComponent(libraryId).then((c) => {
      component = c
    })

    const atomType = randomAtomType()

    cy.createAtom(atomType).then((a) => {
      atom = a
    })
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

    cy.getOpenedModal().findByLabelText('Label').type(label)
    cy.getOpenedModal().findByLabelText('Atom').click()
    cy.getSelectOptionItemByValue(atom.type).first().click()
    cy.getOpenedModal()
      .findByRole('button', { name: 'Create component element' })
      .click() //Click the submit button

    cy.wait('@graphql') //Wait for the request to finish

    //Validate component element is created
    cy.getOpenedModal().should('not.exist') //modal should close

    getAndExpandElementInTree(`${component.label} Root`)
    getComponentElementInTree(label) //We should have the new item in the tree
  })

  it('creates nested component elements', () => {
    //Setup
    const parentLabel = 'Best element ever'
    const childLabel = "Best element's child"

    createComponentElement(parentLabel).then((parentElement) => {
      openComponentsTab()

      getAndExpandElementInTree(component.label + ' Root')
      getComponentElementInTree(parentElement.label).first().click()

      cy.getByTestId('pane-config')
        .findByRole('button', { name: 'Insert child element' })
        .click()

      //Create the component element
      cy.getOpenedModal().findByLabelText('Label').type(childLabel)
      cy.getOpenedModal().openSelectByLabel('Atom')
      cy.getSelectOptionItemByValue(atom.type).first().click()
      cy.getOpenedModal().findByRole('button', { name: 'Create' }).click() //Click the submit button

      cy.wait('@graphql') //Wait for the request to finish

      //Validate component element is created
      cy.getOpenedModal().should('not.exist') //modal should close

      getAndExpandElementInTree(parentLabel)
      getComponentElementInTree(childLabel) //We should have the new item in the tree
    })
  })

  it('updates component elements', () => {
    //Setup
    const label = 'Good element'
    const newLabel = 'BEST element'

    createComponentElement(label).then((element) => {
      openComponentsTab()

      getAndExpandElementInTree(component.label + ' Root')
      getComponentElementInTree(element.label).first().click() //Focus the element

      //Update the component element
      cy.getByTestId('pane-config') //We should get the form in the right pane
        .findByLabelText('Label')
        .clear()
        .type(newLabel)

      cy.getByTestId('pane-config').openSelectByLabel('Atom')

      cy.getSelectOptionItemByValue(atom.type).first().click({ force: true })

      cy.wait('@graphql') //it should auto save, wait for the request to finish

      //Validate component element is updated in  the tree
      getComponentElementInTree(label).should('not.exist')
      getComponentElementInTree(newLabel) //We should have the new item in the tree
    })
  })

  it('deletes component elements', () => {
    //Setup
    const label = 'bye bye element'

    createComponentElement(label).then((element) => {
      openComponentsTab()

      getAndExpandElementInTree(component.label + ' Root')
      getComponentElementInTree(element.label).first().click() //Focus the element

      //Delete the component element
      cy.getByTestId('pane-config') //We should get the form in the right pane
        .find('button [data-icon=delete]')
        .click()

      cy.getOpenedModal().findByRole('button', { name: 'Delete' }).click() //Click the submit button

      cy.wait('@graphql') //wait for the request to finish

      //Validate component element is not in the tree
      cy.getOpenedModal().should('not.exist') //modal should close
      getComponentElementInTree(label).should('not.exist')
    })
  })
})
