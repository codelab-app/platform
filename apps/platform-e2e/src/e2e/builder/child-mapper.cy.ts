import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import { NETWORK_IDLE_TIME } from '@codelab/frontend/test/cypress/shared'
import type { IAppDto, IComponentDto } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import type { Interception } from 'cypress/types/net-stubbing'
import {
  providerPageRowElement,
  providerPageRowFirstChild,
  providerPageRowSecondChild,
} from './child-mapper.data'
import { setupTest } from './child-mapper.setup'

describe('Element Child Mapper', () => {
  let app: IAppDto
  let component: IComponentDto

  before(() => {
    setupTest()

    cy.get<{ app: IAppDto; component: IComponentDto }>('@setupComplete').then(
      (res) => {
        app = res.app
        component = res.component
      },
    )
  })

  it('should add data via Child Mapper form', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    )
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
    cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

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
    cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

    // rendered instances are removed
    cy.get('.ant-tree-treenode-draggable').should('have.length', 4)

    // changed props
    cy.openPreview()
    cy.get('#render-root').contains('text updated test 1').should('not.exist')
    cy.get('#render-root').contains('text updated test 2').should('not.exist')
  })

  it('should not render instances when the prop is not an array', () => {
    cy.openBuilder()
    cy.findAllByText(providerPageRowElement.name).first().click()

    cy.get('.ant-collapse').setFormFieldValue({
      type: FIELD_TYPE.CODE_MIRROR,
      value: '{{false}}',
    })
    cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

    // rendered instances are removed
    cy.get('.ant-tree-treenode-draggable').should('have.length', 4)

    // changed props
    cy.openPreview()
    cy.get('#render-root').contains('text updated test 1').should('not.exist')
    cy.get('#render-root').contains('text updated test 2').should('not.exist')
  })
})
