import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { App } from '@codelab/shared/abstract/codegen'
import type {
  IAppDto,
  IComponentDto,
  IPageDto,
} from '@codelab/shared/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import { findOrFail, slugify } from '@codelab/shared/utils'
import type { Interception } from 'cypress/types/net-stubbing'
import {
  childMapperComponent,
  childMapperComponentElementTypography,
  providerPageElements,
  providerPageRowElement,
  providerPageRowFirstChild,
  providerPageRowSecondChild,
} from './child-mapper.data'

let app: IAppDto
let page: IPageDto
let component: IComponentDto

const setupTest = () => {
  cy.postApiRequest<App>('/app/seed-cypress-app')
    .then(({ body }) => {
      app = body
      page = findOrFail(app.pages, (_page) => _page.kind === IPageKind.Provider)

      cy.wrap(page).should('have.property', 'store')

      return cy.wrap(app)
    })
    .as('cypressApp')

  cy.get('@cypressApp').then(() => {
    return cy
      .postApiRequest<IComponentDto>(
        `element/${page.rootElement.id}/create-elements`,
        providerPageElements(page),
      )
      .as('cypressProviderElements')
  })

  cy.get('@cypressProviderElements').then(() =>
    cy
      .postApiRequest<IComponentDto>(
        'component/create-component',
        childMapperComponent,
      )
      .then(({ body }) => {
        component = body
      })
      .as('cypressComponent'),
  )

  cy.get('@cypressComponent').then(() =>
    cy
      .postApiRequest<Element>(
        `element/${component.rootElement.id}/create-element`,
        {
          ...childMapperComponentElementTypography,
          parentElement: component.rootElement,
        },
      )
      .as('cypressElements'),
  )

  cy.get('@cypressElements').then(() =>
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    ),
  )
}

describe('Element Child Mapper', () => {
  before(() => {
    setupTest()
  })

  it('should add data via Child Mapper form', () => {
    cy.findAllByText(providerPageRowElement.name).first().click()
    cy.findByText('Child Mapper').click()

    cy.intercept('POST', 'api/graphql').as('selectPreviousSibling')
    cy.get('.ant-collapse').setFormFieldValue({
      label: 'Render next to',
      type: FIELD_TYPE.SELECT,
      value: providerPageRowFirstChild.name,
    })
    cy.wait('@selectPreviousSibling')

    cy.intercept('POST', 'api/graphql').as('addDataSource')
    cy.get('.ant-collapse').findByRole('button', { name: 'JS' }).click()
    cy.get('.ant-collapse').setFormFieldValue({
      type: FIELD_TYPE.CODE_MIRROR,
      value: '{{[{ name: "test 1" }, { name: "test 2" }]}}',
    })
    cy.wait('@addDataSource')

    cy.intercept('POST', 'api/graphql').as('selectComponent')
    cy.get('.ant-collapse').setFormFieldValue({
      label: 'Component',
      type: FIELD_TYPE.SELECT,
      value: component.name,
    })
    // The select component field fetches the component options first when clicked
    // so we need to wait for the graphql operation that actually updates the element
    cy.get<Array<Interception>>('@selectComponent.all')
      .should('have.length', 2)
      .then((interceptions) => {
        const lastInterception = interceptions[interceptions.length - 1]

        cy.wrap(lastInterception?.request.body.operationName).should(
          'eq',
          'UpdateElements',
        )
      })
  })

  it('should render the component instances with props values from array', () => {
    cy.openPreview()
    cy.get('#render-root').contains('text test 1')
    cy.get('#render-root').contains('text test 2')
    cy.openBuilder()
  })

  it('should render the component instances n times and next to the selected previous sibling', () => {
    cy.get('.ant-tree-treenode-draggable:nth-child(3)')
      .contains(providerPageRowFirstChild.name)
      .should('exist')
    cy.get('.ant-tree-treenode-draggable:nth-child(4)')
      .contains(`${component.name} Root 0`)
      .should('exist')
    cy.get('.ant-tree-treenode-draggable:nth-child(5)')
      .contains(`${component.name} Root 1`)
      .should('exist')
    cy.get('.ant-tree-treenode-draggable:nth-child(6)')
      .contains(providerPageRowSecondChild.name)
      .should('exist')
  })

  it('should update the rendered instances when props values from array and previous sibling is updated', () => {
    cy.findAllByText(providerPageRowElement.name).first().click()

    cy.get('.ant-collapse').setFormFieldValue({
      label: 'Render next to',
      type: FIELD_TYPE.SELECT,
      value: providerPageRowSecondChild.name,
    })
    cy.get('.ant-collapse').setFormFieldValue({
      type: FIELD_TYPE.CODE_MIRROR,
      value: '{{[{ name: "updated test 1" }, { name: "updated test 2" }]}}',
    })

    cy.waitForApiCalls()

    // changed props
    cy.openPreview()
    cy.get('#render-root').contains('text updated test 1')
    cy.get('#render-root').contains('text updated test 2')
    cy.openBuilder()

    // changed order
    cy.get('.ant-tree-treenode-draggable:nth-child(3)')
      .findByText(providerPageRowFirstChild.name)
      .should('exist')
    cy.get('.ant-tree-treenode-draggable:nth-child(4)')
      .findByText(providerPageRowSecondChild.name)
      .should('exist')
    cy.get('.ant-tree-treenode-draggable:nth-child(5)')
      .findByText(`${component.name} Root 0`)
      .should('exist')
    cy.get('.ant-tree-treenode-draggable:nth-child(6)')
      .findByText(`${component.name} Root 1`)
      .should('exist')
  })

  it('should not render instances when the prop arrary is empty', () => {
    cy.findAllByText(providerPageRowElement.name).first().click()

    cy.get('.ant-collapse').setFormFieldValue({
      type: FIELD_TYPE.CODE_MIRROR,
      value: '{{[]}}',
    })

    cy.waitForApiCalls()

    // rendered instances are removed
    cy.get('.ant-tree-treenode-draggable').should('have.length', 4)

    // changed props
    cy.openPreview()
    cy.get('#render-root').contains('text updated test 1').should('not.exist')
    cy.get('#render-root').contains('text updated test 2').should('not.exist')
    cy.openBuilder()
  })

  it('should not render instances when the prop is not an array', () => {
    cy.findAllByText(providerPageRowElement.name).first().click()

    cy.get('.ant-collapse').setFormFieldValue({
      type: FIELD_TYPE.CODE_MIRROR,
      value: '{{false}}',
    })

    cy.waitForApiCalls()

    // rendered instances are removed
    cy.get('.ant-tree-treenode-draggable').should('have.length', 4)

    // changed props
    cy.openPreview()
    cy.get('#render-root').contains('text updated test 1').should('not.exist')
    cy.get('#render-root').contains('text updated test 2').should('not.exist')
  })
})
