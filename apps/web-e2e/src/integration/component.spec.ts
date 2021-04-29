import { DeleteAllComponentsGql } from '@codelab/hasura'
import { print } from 'graphql'

const deleteAllComponents = () => {
  return cy.hasuraAdminRequest({
    query: print(DeleteAllComponentsGql),
  })
}

const getComponentGridItemByTestId = (id?: string) =>
  cy.getByTestId(
    'component-grid-item',
    id ? `[data-component-id=${id}]` : undefined,
  )

const getComponentGridItemByLabel = (label: string) =>
  cy.findByRole('tabpanel').findByText(label)

describe('Component', () => {
  let appId: string
  let pageId: string
  let libraryId: string

  const openComponentsTab = () => {
    cy.visit(`/apps/${appId}/pages/${pageId}`)
    cy.getByTestId('component-tab-trigger').click()
  }

  before(() => {
    cy.clearCookies()

    cy.login().then(() => {
      cy.createApp().then((app) => {
        appId = app.id
        pageId = app.pages[0].id
      })

      cy.createLibrary().then((l) => {
        libraryId = l.id
      })
    })
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('appSession')
  })

  it('creates component', () => {
    //Setup
    const label = 'Test component'
    cy.intercept('/api/graphql').as('graphql')
    deleteAllComponents()
    openComponentsTab()

    getComponentGridItemByTestId().should('not.exist') //We should have no items in the list

    //Create the component
    cy.findMainPanelHeaderPlusButton().click() //Click the plus button in the tab header
    cy.getOpenedModal().findByLabelText('Label').clear().type(label) //Input the label
    cy.getOpenedModal().findByButtonText('Create component').click() //Click the submit button

    cy.wait('@graphql') //Wait for the request to finish

    //Validate component is created
    cy.getOpenedModal().should('not.exist') //modal should close
    getComponentGridItemByLabel(label) //We should have the new item in the list
  })

  it('updates component', () => {
    //Setup
    cy.intercept('/api/graphql').as('graphql')

    const newLabel = 'My LOVELY component!'

    deleteAllComponents().then(() => {
      cy.createComponent(libraryId).then((component) => {
        openComponentsTab()

        //Find component in the left tab
        getComponentGridItemByLabel(component.label).rightclick() //Right click it to open the context menu

        cy.getOpenedDropdownMenu()
          .findByText('Edit') //And click the edit item
          .click()

        //Update component
        cy.getOpenedModal().findByLabelText('Label').clear().type(newLabel)
        cy.getOpenedModal().findByButtonText('Update component').click()

        cy.wait('@graphql')

        //Validate component is updated
        cy.getOpenedModal().should('not.exist') //modal should close
        getComponentGridItemByLabel(newLabel) //We should have the new item in the list
      })
    })
  })

  it('deletes component', () => {
    //Setup
    cy.intercept('/api/graphql').as('graphql')

    deleteAllComponents().then(() => {
      cy.createComponent(libraryId).then((component) => {
        openComponentsTab()

        //Find component in the left tab
        getComponentGridItemByLabel(component.label).rightclick() //Right click it to open the context menu

        cy.getOpenedDropdownMenu()
          .findByText('Delete') //And click the Delete item
          .click()

        //Delete component
        cy.getOpenedModal().findByButtonText('Delete component').click()

        cy.wait('@graphql')

        //Validate component is deleted
        cy.getOpenedModal().should('not.exist') //modal should close
        getComponentGridItemByTestId().should('not.exist') //We should not have any items in the list
      })
    })
  })

  it('deletes the correct component', () => {
    //Setup
    cy.intercept('/api/graphql').as('graphql')

    deleteAllComponents().then(() => {
      cy.createComponent(libraryId, 'Test component 1').then((comp1) => {
        cy.createComponent(libraryId, 'Test component 2').then(
          (compToDelete) => {
            openComponentsTab()

            //Ensure we have the 2 components in the left tab
            getComponentGridItemByLabel(comp1.label)
            getComponentGridItemByLabel(compToDelete.label).rightclick() //Click comp2 delete button

            cy.getOpenedDropdownMenu()
              .findByText('Delete') //And click the Delete item
              .click()

            //Delete component
            cy.getOpenedModal().findByButtonText('Delete component').click()

            cy.wait('@graphql') //Wait for request

            //Validate component is deleted
            cy.getOpenedModal().should('not.exist') //modal should close
            getComponentGridItemByLabel(compToDelete.label).should('not.exist') //We should not have the deleted item in the list
            getComponentGridItemByLabel(comp1.label) //But should have the other item in the list
          },
        )
      })
    })
  })
})
