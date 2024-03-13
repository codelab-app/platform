import type { App } from '@codelab/shared/abstract/codegen'
import type {
  IApiActionDto,
  IAppDto,
  IComponentDto,
  IPageDto,
  IResourceDto,
} from '@codelab/shared/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import { findOrFail, slugify } from '@codelab/shared/utils'
import { createResourceData } from '../preview/resource.data'
import {
  apiActionCreateData,
  childMapperData,
  componentCreateData,
  componentElementCreateData,
  providerPageElementCreateData,
} from './child-mapper-api-actions-with-props.data'

let app: IAppDto
let page: IPageDto
let component: IComponentDto
let resource: IResourceDto

const setupTest = () => {
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
      .then(({ body }) => {
        resource = body
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
}

describe('Element Child Mapper', () => {
  before(() => {
    setupTest()
  })

  it('should render the component instances with props values from array', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}`,
    )
    childMapperData.forEach((data) => {
      cy.get('#render-root')
        .contains(`Name of data - ${data.name}`)
        .should('exist')
    })
  })

  it('should call the api action with the componentProps.id of each child mapper instances when the button is clicked', () => {
    for (const data of childMapperData) {
      cy.intercept(
        'GET',
        `${createResourceData.config.url}/data/${data.id}`,
        'the response',
      ).as(`getData-${data.id}`)

      cy.get('#render-root')
        .contains(`Name of data - ${data.name}`)
        .click({ force: true })

      cy.wait(`@getData-${data.id}`)
    }
  })
})
