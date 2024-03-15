import type { App } from '@codelab/shared/abstract/codegen'
import type {
  IApiActionDto,
  IAppDto,
  ICodeActionDto,
  IPageDto,
  IResourceDto,
} from '@codelab/shared/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import { findOrFail, slugify } from '@codelab/shared/utils'
import { createResourceData } from '../preview/resource.data'
import {
  postRenderApiActionCreateData,
  postRenderCodeActionCreateData,
  preRenderApiActionCreateData,
  preRenderCodeActionCreateData,
} from './pre-post-api-action.data'

export const setupTest = (app: IAppDto, page: IPageDto) => {
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
        preRenderCodeActionCreateData(page!),
      ),
    )
    .as('createdPreRenderCodeAction')

  cy.get('@createdPreRenderCodeAction')
    .then(() =>
      cy.postApiRequest<IApiActionDto>(
        '/action/create-action',
        preRenderApiActionCreateData(page!),
      ),
    )
    .as('createdPreRenderApiAction')

  cy.get('@createdPreRenderApiAction')
    .then(() =>
      cy.postApiRequest<ICodeActionDto>(
        '/action/create-action',
        postRenderCodeActionCreateData(page!),
      ),
    )
    .as('createdPostRenderCodeAction')

  cy.get('@createdPostRenderCodeAction')
    .then(() =>
      cy.postApiRequest<IApiActionDto>(
        '/action/create-action',
        postRenderApiActionCreateData(page!),
      ),
    )
    .as('createdPostRenderApiAction')

  cy.get('@createdPostRenderApiAction').then(() =>
    cy.visit(
      `/apps/cypress/${slugify(app!.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    ),
  )
}
