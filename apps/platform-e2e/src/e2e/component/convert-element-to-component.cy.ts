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

    // the element descendants of a component instance is not shown
    cy.getCuiTreeItemByPrimaryTitle(elementRowCreateData.name).should(
      'not.exist',
    )
    cy.getCuiTreeItemByPrimaryTitle(elementColCreateData.name).should(
      'not.exist',
    )
    cy.getCuiTreeItemByPrimaryTitle(elementTextCreateData.name).should(
      'not.exist',
    )
  })

  it('should still have the descendant elements of the component', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder?primarySidebarKey=components`,
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.waitForSpinners()

    // GetAtoms
    // GetComponents
    cy.waitForApiCalls()
    cy.waitForSpinners()

    cy.getCuiSidebar('Components')
      .getCuiSidebarViewContent('Custom')
      .contains('.ant-card-head-title', elementContainerCreateData.name)
      .next()
      .getButton({ icon: 'edit' })
      .click()

    // the element descendants of a component should show on the custom component builder
    cy.getCuiTreeItemByPrimaryTitle(elementRowCreateData.name).should('exist')
    cy.getCuiTreeItemByPrimaryTitle(elementColCreateData.name).should('exist')
    cy.getCuiTreeItemByPrimaryTitle(elementTextCreateData.name).should('exist')
  })
})
