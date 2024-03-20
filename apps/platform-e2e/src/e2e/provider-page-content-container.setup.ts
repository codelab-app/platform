import type { App } from '@codelab/shared/abstract/codegen'
import type {
  IAppDto,
  IElement,
  IPage,
  IPageDto,
} from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { findOrFail } from '@codelab/shared/utils'
import {
  providerPageCardElementCreateData,
  regularPageCreateData,
  regularPageInputElementCreateData,
} from './provider-page-content-container.data'

export const setupTest = () => {
  let app: IAppDto
  let page: IPageDto
  let regularPage: IPageDto

  cy.postApiRequest<App>('/app/seed-cypress-app')
    .then(({ body }) => {
      app = body
      page = findOrFail(app.pages, (_page) => _page.kind === IPageKind.Provider)

      cy.wrap(page).should('have.property', 'store')

      return cy.wrap(app)
    })
    .as('createdApp')

  cy.get('@createdApp').then(() =>
    cy
      .postApiRequest<IPage>('/page/create-page', regularPageCreateData(app))
      .then(({ body }) => {
        regularPage = body
      })
      .as('createdRegularPage'),
  )

  cy.get('@createdRegularPage').then(() =>
    cy
      .postApiRequest<IElement>(
        `element/${page.rootElement.id}/create-element`,
        providerPageCardElementCreateData(page),
      )
      .as('createProviderPageElement'),
  )

  cy.get('@createProviderPageElement').then(() =>
    cy
      .postApiRequest<IElement>(
        `element/${regularPage.rootElement.id}/create-element`,
        regularPageInputElementCreateData(regularPage),
      )
      .as('createRegularPageElement'),
  )

  cy.get('@createRegularPageElement')
    .then(() => ({ app, page: regularPage }))
    .as('setupComplete')
}
