import { type IApp } from '@codelab/shared/abstract/core'
import { expect } from '@playwright/test'
import { seedTestData } from './convert-element-to-component.data'
import { test } from './convert-element-to-component.fixture'

let app: IApp

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ request }, testInfo) => {
  // db reset, app seed and test data seed may sometimes take longer than default 60s
  test.setTimeout(testInfo.timeout + 30000)

  app = await seedTestData(request)
})

test('should convert the element into a component and create an instance of it', async ({
  builderPage: page,
}) => {
  await page.goto(app.id, app.pages![0]!.id)
  await page.checkPageHeaderTitle(['Codelab App', 'Pages', '_app'])

  await expect(page.getSpinner()).toBeHidden()

  // // select element before calling the context menu, this will wait for animations to complete
  // cy.getCuiTreeItemByPrimaryTitle(elementContainerCreateData.name).click()
  // cy.getCuiTreeItemByPrimaryTitle(
  //   elementContainerCreateData.name,
  // ).rightclick()
  // cy.findByText('Convert To Component').click()
  // cy.findByText(`instance of ${elementContainerCreateData.name}`).should(
  //   'be.visible',
  // )

  await page.convertElementToComponent()
  await page.goToComponentBuilderPage()

  // cy.visit(`/components/${slugify(elementContainerCreateData.name)}/builder`)
  // // the element descendants should still be in correct order
  // // Container Root -> Row -> Col -> Text
  // // root element which is the Container
  // // Container Root element which is the first child and is already shown initially
  // cy.getCuiTreeItemByPrimaryTitle(
  //   `${elementContainerCreateData.name} Root`,
  // ).should('exist')
  // cy.getCuiTreeItemByPrimaryTitle(elementRowCreateData.name).should('exist')
  // // this is the child of the Row element and has to expand before it can be seen
  // cy.getCuiTreeItemByPrimaryTitle(elementColCreateData.name).should(
  //   'not.exist',
  // )
  // cy.getCuiTreeItemByPrimaryTitle(elementRowCreateData.name).click()
  // cy.getCuiTreeItemByPrimaryTitle(elementColCreateData.name).should('exist')
  // // this is the child of the Col element and has to expand before it can be seen
  // cy.getCuiTreeItemByPrimaryTitle(elementTextCreateData.name).should(
  //   'not.exist',
  // )
  // cy.getCuiTreeItemByPrimaryTitle(elementColCreateData.name).click()
  // cy.getCuiTreeItemByPrimaryTitle(elementTextCreateData.name).should('exist')
})
