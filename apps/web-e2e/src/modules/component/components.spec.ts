import { type IAppDto, IAtomType } from '@codelab/shared-abstract-core'
import { providerPageId } from '@codelab/shared-data-test'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import { seedAppData } from '../app/app.data'
import { elementColA, elementColB, elementColC } from '../builder/builder.data'
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
  app = await seedAppData(request, {
    atomTypes: [IAtomType.AntDesignTypographyText, IAtomType.AntDesignGridCol],
    componentTypes: [],
  })
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

  await page.expectGlobalProgressBarToBeHidden()

  await expect(page.getFormFieldSpinner()).toHaveCount(0)

  await page.createElementTree([componentInstance, componentInstanceChild])
  await page.selectTreeElement(componentInstance)
  await page.openPropsTab()
  await page.setComponentPropValue()

  await expect(page.getBuilderRenderContainer()).toContainText(
    `text ${COMPONENT_PROP_VALUE}`,
  )
})

test('should be able to delete component elements', async ({
  componentListPage: page,
}) => {
  await page.openComponentBuilder()
  await page.checkRootElementExists()
  await page.createElementTree([
    { ...elementColA, parentElement: 'New Component Root' },
    { ...elementColB, parentElement: 'New Component Root' },
    { ...elementColC, parentElement: 'New Component Root' },
  ])

  const colAElement = page.getTreeElement(elementColA.name, elementColA.atom)
  const colBElement = page.getTreeElement(elementColB.name, elementColB.atom)
  const colCElement = page.getTreeElement(elementColC.name, elementColC.atom)

  await expect(colAElement).toBeVisible()
  await expect(colBElement).toBeVisible()
  await expect(colCElement).toBeVisible()

  await page.deleteElementByContextMenu(elementColA)
  await page.deleteElementFromUpdateForm(elementColB)
  await page.deleteElementFromOverlay(elementColC)

  await expect(colAElement).toBeHidden()
  await expect(colBElement).toBeHidden()
  await expect(colCElement).toBeHidden()
  await expect(page.getNotification()).toBeHidden()
})

test('should be able to delete component', async ({
  componentListPage: page,
}) => {
  await page.openDeleteComponentModal()
  await page.clickModalConfirmButton()

  await expect(page.getComponentName()).toBeHidden()
})
