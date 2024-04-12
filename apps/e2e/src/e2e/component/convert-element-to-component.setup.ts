import type { App } from '@codelab/shared/abstract/codegen'
import type { IAppDto, IPageDto } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { findOrFail } from '@codelab/shared/utils'
import { providerPageElements } from './convert-element-to-component.data'

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

  cy.get('@createdApp').then(() => {
    return cy
      .postApiRequest(
        `element/${page.rootElement.id}/create-elements`,
        providerPageElements(page),
      )
      .as('createdProviderPageElements')
  })

  cy.get('@createdProviderPageElements')
    .then(() => ({
      app,
      page,
    }))
    .as('setupComplete')
}
