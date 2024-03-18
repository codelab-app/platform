import type { App } from '@codelab/shared/abstract/codegen'
import type {
  IAppDto,
  IComponentDto,
  IPageDto,
} from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { findOrFail } from '@codelab/shared/utils'
import {
  childMapperComponent,
  childMapperComponentElementTypography,
  providerPageElements,
} from './child-mapper.data'

export const setupTest = () => {
  let app: IAppDto
  let page: IPageDto
  let component: IComponentDto

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

  cy.get('@createdProviderPageElements').then(() =>
    cy
      .postApiRequest<IComponentDto>(
        'component/create-component',
        childMapperComponent,
      )
      .then(({ body }) => {
        component = body
      })
      .as('createdComponent'),
  )

  cy.get('@createdComponent').then(() =>
    cy
      .postApiRequest<Element>(
        `element/${component.rootElement.id}/create-element`,
        {
          ...childMapperComponentElementTypography,
          parentElement: component.rootElement,
        },
      )
      .as('createdComponentElement'),
  )

  cy.get('@createdComponentElement')
    .then(() => ({
      app,
      component,
      page,
    }))
    .as('setupComplete')
}
