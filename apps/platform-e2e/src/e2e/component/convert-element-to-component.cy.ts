import type { App } from '@codelab/shared/abstract/codegen'
import type { IAppDto, IPageDto } from '@codelab/shared/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import { findOrFail, slugify } from '@codelab/shared/utils'
import {
  elementColCreateData,
  elementContainerCreateData,
  elementRowCreateData,
  elementTextCreateData,
  providerPageElements,
} from './convert-element-to-component.data'

let app: IAppDto
let page: IPageDto

const setupTest = () => {
  cy.postApiRequest<App>('/app/seed-cypress-app')
    .then(({ body }) => {
      app = body
      page = findOrFail(app.pages, (_page) => _page.kind === IPageKind.Provider)

      cy.wrap(page).should('have.property', 'store')

      return cy.wrap(app)
    })
    .as('createdApp')

  cy.get('@createdApp').then(() => {
    return cy
      .postApiRequest(
        `element/${page.rootElement.id}/create-elements`,
        providerPageElements(page),
      )
      .as('cypressProviderElements')
  })

  cy.get('@cypressProviderElements').then(() =>
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    ),
  )
}

describe('Converting an element to a component', () => {
  before(() => {
    setupTest()
  })
  it('should convert the element into a component and create an instance of it', () => {
    cy.getCuiTreeItemByPrimaryTitle(
      elementContainerCreateData.name,
    ).rightclick()

    cy.findByText('Convert To Component').click()

    cy.findByText(`instance of ${elementContainerCreateData.name}`).should(
      'be.visible',
    )
  })

  it('should still have the descendant elements of the component', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/components/${slugify(
        elementContainerCreateData.name,
      )}/builder?primarySidebarKey=explorer`,
    )

    // the element descendants should still be in correct order
    // Container -> Row -> Col -> Text
    // root element which is the Container
    cy.getCuiTreeItemByPrimaryTitle(elementContainerCreateData.name).should(
      'be.visible',
    )

    // Row element which is the first child and is already shown initially
    cy.getCuiTreeItemByPrimaryTitle(elementRowCreateData.name).should('exist')

    // this is the child of the Row element and has to expand before it can be seen
    cy.getCuiTreeItemByPrimaryTitle(elementColCreateData.name).should(
      'not.exist',
    )
    cy.getCuiTreeItemByPrimaryTitle(elementRowCreateData.name).click()
    cy.getCuiTreeItemByPrimaryTitle(elementColCreateData.name).should('exist')

    // this is the child of the Col element and has to expand before it can be seen
    cy.getCuiTreeItemByPrimaryTitle(elementTextCreateData.name).should(
      'not.exist',
    )
    cy.getCuiTreeItemByPrimaryTitle(elementColCreateData.name).click()
    cy.getCuiTreeItemByPrimaryTitle(elementTextCreateData.name).should('exist')
  })
})
