import { RoutePaths } from '@codelab/frontend-abstract-application'
import { UiKey } from '@codelab/frontend-abstract-types'
import { expect } from '@playwright/test'

import { globalBeforeAll } from '../../setup/before-all'
import { test } from './atom.fixture'

test.describe.configure({ mode: 'serial' })

globalBeforeAll()

test.beforeEach(async ({ atomPage: page }) => {
  await page.goto()

  await expect(page.getSpinner()).toBeHidden()
  await expect(page.getSkeleton()).toBeHidden()
})

test('it should be able to create an atom', async ({ atomPage: page }) => {
  await page.expectOnlyReactFragmentAtom()

  await page
    .getSidebar(UiKey.AtomSidebar)
    .getToolbarItem(UiKey.AtomToolbarItemCreate)
    .click()

  await page.fillAndSubmitAtomFormCreate()

  await page.expectGlobalProgressBarToBeHidden()
  await page.waitForPage(RoutePaths.Atom.base())

  await expect(page.getAtomName()).toBeVisible()
})

test('it should be able to update an atom name', async ({ atomPage: page }) => {
  await page.getTreeItemBySecondaryTitle(page.atom.name).locator?.click()

  await page.fillAndSubmitAtomFormUpdate()

  await page.waitForPage(RoutePaths.Atom.base())

  await expect(page.getAtomName()).toBeHidden()

  await expect(page.getUpdatedAtomName()).toBeVisible()
})

test('should be able to delete an atom', async ({ atomPage: page }) => {
  await page.getTreeItemBySecondaryTitle(page.updatedAtom.name).locator?.hover()

  await page
    .getTreeItemBySecondaryTitle(page.updatedAtom.name)
    .getToolbarItem(UiKey.AtomsToolbarItemDelete)
    .click()

  await page.fillAndSubmitAtomFormDelete()

  await page.waitForPage(RoutePaths.Atom.base())

  await expect(page.getAtomName()).toBeHidden()

  await expect(page.getUpdatedAtomName()).toBeHidden()
})

/**
 * This tests whether other associated has been deleted, like api
 */
test('it should be able to create the same atom again', async ({
  atomPage: page,
}) => {
  await page.expectOnlyReactFragmentAtom()

  await page
    .getSidebar(UiKey.AtomSidebar)
    .getToolbarItem(UiKey.AtomToolbarItemCreate)
    .click()

  await page.fillAndSubmitAtomFormCreate()

  await page.expectGlobalProgressBarToBeHidden()
  await page.waitForPage(RoutePaths.Atom.base())

  await expect(page.getAtomName()).toBeVisible()
})
