import type { App } from '@codelab/shared/abstract/codegen'
import type { IAppDto, IPage, IPageDto } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { findOrFail } from '@codelab/shared/utils'
import {
  buildTestPages,
  dynamicPageTextElementCreateData,
  providerPageLinkElementCreateData,
  staticPageLinkElementCreateData,
  staticPageTextElementCreateData,
} from './in-app-routing.data'

export const setupTest = () => {
  let app: IAppDto
  let page: IPageDto

  cy.postApiRequest<App>('/app/seed-cypress-app')
    .then(({ body }) => {
      app = body

      page = findOrFail(app.pages, (_page) => _page.kind === IPageKind.Provider)
    })
    .as('appCreated')

  cy.get('@appCreated').then(() => {
    const { dynamicPageCreateData, staticPageCreateData } = buildTestPages(app)

    cy.postApiRequest(`/element/${page.id}/create-element`, {
      ...providerPageLinkElementCreateData,
      parentElement: { id: page.rootElement.id },
    }).as('providerPageLinkElementCreated')

    cy.postApiRequest('/page/create-page', staticPageCreateData).as(
      'staticPageCreated',
    )

    cy.get<Cypress.Response<IPage>>('@staticPageCreated').then(
      ({ body: staticPage }) => {
        cy.postApiRequest(`/element/${staticPage.id}/create-elements`, [
          {
            ...staticPageTextElementCreateData,
            parentElement: { id: staticPage.rootElement.id },
          },
          staticPageLinkElementCreateData,
        ]).as('staticPageElementsCreated')
      },
    )

    cy.postApiRequest('/page/create-page', dynamicPageCreateData).as(
      'dynamicPageCreated',
    )

    cy.get<Cypress.Response<IPage>>('@dynamicPageCreated').then(
      ({ body: dynamicPage }) => {
        cy.postApiRequest(`/element/${dynamicPage.id}/create-element`, {
          ...dynamicPageTextElementCreateData,
          parentElement: { id: dynamicPage.rootElement.id },
        }).as('dynamicPageContentElementCreated')
      },
    )
  })

  cy.get('@providerPageLinkElementCreated')
    .get('@staticPageElementsCreated')
    .get('@dynamicPageContentElementCreated')
    .then(() => ({
      app,
      page,
    }))
    .as('setupComplete')
}
