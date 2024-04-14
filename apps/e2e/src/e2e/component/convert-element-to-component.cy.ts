import type { IAppDto } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import {
  elementColCreateData,
  elementContainerCreateData,
  elementRowCreateData,
  elementTextCreateData,
} from './convert-element-to-component.data'
import { setupTest } from './convert-element-to-component.setup'

describe('Converting an element to a component', () => {
  let app: IAppDto

  before(() => {
    setupTest()

    cy.get<{ app: IAppDto }>('@setupComplete').then((res) => {
      app = res.app
    })
  })
  it('should convert the element into a component and create an instance of it', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    )
    cy.getCuiTreeItemByPrimaryTitle(
      elementContainerCreateData.name,
    ).rightclick()

    cy.findByText('Convert To Component').click()

    cy.findByText(`instance of ${elementContainerCreateData.name}`).should(
      'be.visible',
    )
  })

  it('should still have the descendant elements of the component', () => {
    cy.visit(`/components/${slugify(elementContainerCreateData.name)}/builder`)

    // the element descendants should still be in correct order
    // Container -> Row -> Col -> Text
    // root element which is the Container
    cy.getCuiTreeItemByPrimaryTitle(elementContainerCreateData.name).should(
      'be.visible',
    )

    // Row element which is the first child and is already shown initially
    cy.getCuiTreeItemByPrimaryTitle(elementRowCreateData.name).should('exist')

    // this is the child of the Row element and has to expand before it can be seen
    cy.getCuiTreeItemByPrimaryTitle(elementColCreateData.name).should(
      'not.exist',
    )
    cy.getCuiTreeItemByPrimaryTitle(elementRowCreateData.name).click()
    cy.getCuiTreeItemByPrimaryTitle(elementColCreateData.name).should('exist')

    // this is the child of the Col element and has to expand before it can be seen
    cy.getCuiTreeItemByPrimaryTitle(elementTextCreateData.name).should(
      'not.exist',
    )
    cy.getCuiTreeItemByPrimaryTitle(elementColCreateData.name).click()
    cy.getCuiTreeItemByPrimaryTitle(elementTextCreateData.name).should('exist')
  })
})
