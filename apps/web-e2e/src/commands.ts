/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable func-style */

import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { expect, type Locator, type Page } from '@playwright/test'

export const getButton = (page: Page, options: { label: string | RegExp }) => {
  return page.getByRole('button', { name: options.label })
}

export const getModal = (page: Page) => {
  return page.locator('.ant-modal:visible')
}

export const getModalAction = (modal: Locator, label: string | RegExp) => {
  return modal.getByRole('button', { name: label })
}

export const setFormFieldValue = async (
  locator: Locator,
  options: { label: string; value: string },
) => {
  const field = locator.getByLabel(options.label, { exact: true })

  // wait for dynamic dropdowns to populate options
  await expect(locator.getByLabel('loading')).toHaveCount(0)

  await field.fill(options.value)

  // wait for dynamic dropdowns to populate options
  await expect(locator.getByLabel('loading')).toHaveCount(0)

  await field.press('Enter')
}

export const getCard = (page: Page, options: { title: string }) => {
  return page.locator(`.ant-card:has-text("${options.title}")`)
}

export const getDropdownItem = (page: Page, label: string) => {
  return page.getByRole('menuitem', { name: label })
}

export const getCuiTreeItemByPrimaryTitle = async (
  page: Page,
  title: string,
) => {
  return page.getByTestId(`cui-tree-item-primary-title-${title}`)
}

export const getCuiTree = (page: Page) => {
  return page.getByTestId(CuiTestId.cuiTree())
}

/**
 * Doesn't seem to work
 */
// export function Step() {
//   return function (
//     originalMethod: any,
//     context: ClassMethodDecoratorContext<any, any>,
//   ) {
//     return function (this: any, ...args: any) {
//       const name = this.constructor.name + '.' + (context.name as string)

//       return test.step(name, async () => {
//         return originalMethod.call(this, ...args)
//       })
//     }
//   }
// }

export const getTimestamp = () =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Hong_Kong',
  }).format(new Date())
