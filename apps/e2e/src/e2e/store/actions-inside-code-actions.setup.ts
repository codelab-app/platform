import type { App } from '@codelab/shared/abstract/codegen'
import type {
  IApiActionDto,
  IAppDto,
  ICodeActionDto,
  IPageDto,
  IResourceDto,
} from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { findOrFail } from '@codelab/shared/utils'
import {
  apiActionCreateData,
  nestedCodeActionCreateData,
  onClickActionCreateData,
  providerPageElements,
} from './actions-inside-code-actions.data'
import { createResourceData } from './resource.data'

export const setupTest = () => {
  let app: IAppDto
  let page: IPageDto

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
      .postApiRequest<IResourceDto>(
        '/resource/create-resource',
        createResourceData,
      )
      .as('createdResource'),
  )

  cy.get('@createdResource')
    .then(() =>
      cy.postApiRequest<ICodeActionDto>(
        '/action/create-action',
        nestedCodeActionCreateData(page),
      ),
    )
    .as('createdFirstCodeAction')

  cy.get('@createdFirstCodeAction')
    .then(() =>
      cy.postApiRequest<ICodeActionDto>(
        '/action/create-action',
        onClickActionCreateData(page),
      ),
    )
    .as('createdSecondCodeAction')

  cy.get('@createdSecondCodeAction')
    .then(() =>
      cy.postApiRequest<IApiActionDto>(
        '/action/create-action',
        apiActionCreateData(page),
      ),
    )
    .as('createdApiAction')

  cy.get('@createdApiAction').then(() =>
    cy
      .postApiRequest<Element>(
        `element/${page.rootElement.id}/create-elements`,
        providerPageElements(page),
      )
      .as('createProviderPageElements'),
  )

  cy.get('@createProviderPageElements')
    .then(() => ({ app }))
    .as('setupComplete')
}
