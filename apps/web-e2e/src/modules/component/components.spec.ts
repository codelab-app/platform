import type { IAppDto } from '@codelab/shared/abstract/core'

import { providerPageId } from '@codelab/shared/data/test'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import { seedAppData } from '../app/app.data'
import {
  COMPONENT_PROP_VALUE,
  componentInstance,
  componentInstanceChild,
  componentTextElement,
} from './component.data'
import { test } from './component.fixture'

let app: IAppDto

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeAll(async ({ request }) => {
  app = await seedAppData(request, { atomTypes: [], componentTypes: [] })
})

test.beforeEach(async ({ componentListPage: page }) => {
  await page.goto()

  await expect(page.getSpinner()).toBeHidden()
})

test('should be able to create component', async ({
  componentListPage: page,
}) => {
  await page.expectPreexistingComponents()
  await page.expectPreexistingAtoms()

  await page.openCreateComponentPanel()
  await page.fillCreateComponentForm()

  await expect(page.getComponentName()).toBeVisible()
})

test('should be able to define api and elements on component', async ({
  componentListPage: page,
}) => {
  await page.openComponentBuilder()
  await page.openComponentPropsTab()
  await page.addComponentProps()
  await page.createElementTree([componentTextElement])

  await expect(page.getBuilderRenderContainer()).toContainText('text undefined')

  await page.openPreview()

  await expect(page.getBuilderRenderContainer()).toContainText('text undefined')
})

test('should be able to create an instance of the component', async ({
  componentListPage: page,
}) => {
  await page.goto(app.id, providerPageId)

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getFormFieldSpinner()).toHaveCount(0)

  await page.createElementTree([componentInstance, componentInstanceChild])
  await page.selectTreeElement(componentInstance)
  await page.openPropsTab()
  await page.setComponentPropValue()

  await expect(page.getBuilderRenderContainer()).toContainText(
    `text ${COMPONENT_PROP_VALUE}`,
  )
})

test('should be able to delete component', async ({
  componentListPage: page,
}) => {
  await page.openDeleteComponentModal()
  await page.clickModalConfirmButton()

  await expect(page.getComponentName()).toBeHidden()
})
