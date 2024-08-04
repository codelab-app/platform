import type { Locator, Page } from '@playwright/test'

export const getButton = async (
  page: Page,
  options: { label: RegExp | string },
) => {
  return page.getByRole('button', { name: options.label })
}

export const getModal = async (page: Page) => {
  return page.locator('.ant-modal:visible')
}

export const getModalAction = async (
  modal: Locator,
  label: RegExp | string,
) => {
  return modal.getByRole('button', { name: label })
}

export const setFormFieldValue = async (
  page: Page,
  options: { label: string; value: string },
) => {
  const field = page.getByLabel(options.label)

  await field.fill(options.value)
}

export const getCard = async (page: Page, options: { title: string }) => {
  return page.locator(`.ant-card:has-text("${options.title}")`)
}

export const getDropdownItem = async (page: Page, label: string) => {
  return page.getByRole('menuitem', { name: label })
}

export const getCuiTreeItemByPrimaryTitle = async (
  page: Page,
  title: string,
) => {
  return page.locator(`[data-cy="cui-tree-item-primary-title="${title}"]`)
}
