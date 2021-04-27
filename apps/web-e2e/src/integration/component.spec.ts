import {
  CreateComponentGql,
  DeleteAllComponentsGql,
  GetComponents__ComponentFragment,
} from '@codelab/hasura'
import { print } from 'graphql'

const deleteAllComponents = () => {
  return cy.hasuraAdminRequest({
    query: print(DeleteAllComponentsGql),
  })
}

const getComponentGridItem = (id?: string) =>
  cy.getByTestId(
    'component-grid-item',
    id ? `[data-component-id=${id}]` : undefined,
  )

describe('Component', () => {
  let appId: string
  let pageId: string
  let libraryId: string

  const openComponentsTab = () => {
    cy.visit(`/apps/${appId}/pages/${pageId}`)
    cy.getByTestId('component-tab-trigger').click()
  }

  const insertOneComponent = () => {
    return cy.hasuraAdminRequest({
      query: print(CreateComponentGql),
      variables: {
        input: {
          label: 'Test component',
          library_id: libraryId,
        },
      },
    })
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
    cy.intercept('/api/graphql').as('graphql')
    deleteAllComponents()
    openComponentsTab()

    //We should have no items in the list
    getComponentGridItem().should('not.exist')

    cy.getByTestId(`create-component-button`).click()

    const label = 'Test component'
    cy.getByTestId(`create-component-form`)
      .find('input[name=label]')
      .type(label)

    cy.get('.create-component-modal button[type=submit]').click()

    cy.wait('@graphql')

    //modal should close
    cy.getByTestId(`create-component-form`).should('not.exist')
    cy.get('.create-component-modal').should('not.exist')

    //We should have the new item in the list
    getComponentGridItem().findByText(label)
  })

  it('deletes component', () => {
    cy.intercept('/api/graphql').as('graphql')

    deleteAllComponents().then(() => {
      insertOneComponent().then(() => {
        openComponentsTab()

        //We should have 1 item in the list
        getComponentGridItem().should((gridItems) => {
          expect(gridItems).to.have.length(1)
        })

        //We should have the new atom in the list, click its delete button
        getComponentGridItem().rightclick()

        cy.getByTestId('delete-component-button').first().click()

        cy.get('.delete-component-modal button[type=submit]').click()

        cy.wait('@graphql')

        cy.getByTestId('delete-component-form').should('not.exist')
        cy.get('.delete-component-modal').should('not.exist')

        //We should not have any items in the list
        getComponentGridItem().should('not.exist')
      })
    })
  })

  it('deletes the correct component', () => {
    cy.intercept('/api/graphql').as('graphql')

    deleteAllComponents().then(() => {
      insertOneComponent().then((res1) => {
        const comp1 = res1.body.data
          ?.insert_component_one as GetComponents__ComponentFragment

        insertOneComponent().then((re2) => {
          const compToDelete = re2.body.data
            ?.insert_component_one as GetComponents__ComponentFragment

          openComponentsTab()

          //We should have the 2 components in the list
          getComponentGridItem(comp1.id)

          //Click comp2 delete button
          getComponentGridItem(compToDelete.id).rightclick()

          cy.getByTestId('delete-component-button').first().click()

          //Modal should show up, click the submit button to confirm
          cy.get('.delete-component-modal button[type=submit]').click()

          //Wait for request
          cy.wait('@graphql')

          //Modal and delete form should not exist
          cy.getByTestId('delete-component-form').should('not.exist')
          cy.get('.delete-component-modal').should('not.exist')

          //We should not have the deleted component
          getComponentGridItem(compToDelete.id).should('not.exist')

          //But the first one should be here
          getComponentGridItem(comp1.id)
        })
      })
    })
  })
})
