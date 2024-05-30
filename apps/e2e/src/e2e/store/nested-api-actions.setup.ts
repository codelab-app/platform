import type { App } from '@codelab/shared/abstract/codegen'
import type {
  CodeActionDtoSchema,
  IApiActionDto,
  IAppDto,
  ICodeActionDto,
  IPageDto,
  IResourceDto,
} from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { findOrFail } from '@codelab/shared/utils'
import {
  apiGetActionCreateData,
  apiPostActionCreateData,
  errorCodeActionCreateData,
  providerPageElements,
  successCodeActionCreateData,
} from './nested-api-actions.data'
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
        successCodeActionCreateData(page),
      ),
    )
    .as('createdSuccessCodeAction')

  cy.get('@createdSuccessCodeAction')
    .then(() =>
      cy.postApiRequest<ICodeActionDto>(
        '/action/create-action',
        errorCodeActionCreateData(page),
      ),
    )
    .as('createdErrorCodeAction')

  cy.get('@createdErrorCodeAction')
    .then(() =>
      cy.postApiRequest<IApiActionDto>(
        '/action/create-action',
        apiGetActionCreateData(page),
      ),
    )
    .as('createdApiGetAction')

  cy.get('@createdApiGetAction')
    .then(() =>
      cy.postApiRequest<IApiActionDto>(
        '/action/create-action',
        apiPostActionCreateData(page),
      ),
    )
    .as('createdApiPostAction')

  cy.get('@createdApiPostAction').then(() =>
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
