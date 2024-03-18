import type {
  IAppDto,
  IComponentDto,
  IPageDto,
  IResourceDto,
} from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { createResourceData } from '../preview/resource.data'
import { childMapperData } from './child-mapper-api-actions-with-props.data'
import { setupTest } from './child-mapper-api-actions-with-props.setup'

describe('Element Child Mapper', () => {
  let app: IAppDto
  let page: IPageDto
  let component: IComponentDto
  let resource: IResourceDto

  before(() => {
    setupTest()
    cy.get<{
      app: IAppDto
      page: IPageDto
      component: IComponentDto
      resource: IResourceDto
    }>('@setupComplete').then((res) => {
      app = res.app
      page = res.page
      component = res.component
      resource = res.resource
    })
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
