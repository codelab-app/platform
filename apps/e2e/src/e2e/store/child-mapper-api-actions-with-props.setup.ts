import type { App } from '@codelab/shared/abstract/codegen'
import type {
  IApiActionDto,
  IAppDto,
  IComponentDto,
  IPageDto,
  IResourceDto,
} from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { findOrFail } from '@codelab/shared/utils'
import { createResourceData } from '../preview/resource.data'
import {
  apiActionCreateData,
  componentCreateData,
  componentElementCreateData,
  providerPageElementCreateData,
} from './child-mapper-api-actions-with-props.data'

export const setupTest = () => {
  let app: IAppDto
  let page: IPageDto
  let resource: IResourceDto
  let component: IComponentDto

  cy.postApiRequest<App>('/app/seed-cypress-app')
    .then(({ body }) => {
      app = body
      page = findOrFail(app.pages, (_page) => _page.kind === IPageKind.Provider)

      cy.wrap(page).should('have.property', 'store')

      return cy.wrap({ app, page })
    })
    .as('createdApp')

  cy.get('@createdApp').then(() =>
    cy
      .postApiRequest<IResourceDto>(
        '/resource/create-resource',
        createResourceData,
      )
      .then(({ body }) => {
        resource = body

        return cy.wrap(resource)
      })
      .as('createdResource'),
  )

  cy.get('@createdResource').then(() =>
    cy
      .postApiRequest<IComponentDto>(
        'component/create-component',
        componentCreateData,
      )
      .then(({ body }) => {
        component = body

        return cy.wrap(component)
      })
      .as('createdComponent'),
  )

  cy.get('@createdComponent')
    .then(() =>
      cy.postApiRequest<IApiActionDto>(
        '/action/create-action',
        apiActionCreateData(component.store),
      ),
    )
    .as('createdAction')

  cy.get('@createdAction').then(() =>
    cy
      .postApiRequest<Element>(
        `element/${component.rootElement.id}/create-element`,
        componentElementCreateData(component),
      )
      .as('createdComponentElement'),
  )

  cy.get('@createdComponentElement').then(() =>
    cy
      .postApiRequest<Element>(
        `element/${page.rootElement.id}/create-element`,
        providerPageElementCreateData(page),
      )
      .as('createdComponentElement'),
  )

  cy.get('@createdComponentElement')
    .then(() => ({
      app,
      component,
      page,
      resource,
    }))
    .as('setupComplete')
}
