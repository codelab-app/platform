import { PageType } from '@codelab/frontend/abstract/types'
import { ariaLabels } from '@codelab/frontend-application-shared-data'
import { expect, type Page } from '@playwright/test'

class BasePage {
  readonly page: Page

  public constructor(page: Page) {
    this.page = page
  }

  getButton(options: { label: RegExp | string }) {
    return this.page.getByRole('button', { name: options.label })
  }

  getByExactText(text: RegExp | string) {
    return this.page.getByText(text, { exact: true })
  }

  getModal() {
    return this.page.getByRole('dialog')
  }

  getTextBox(options: { label: RegExp | string }) {
    return this.page.getByRole('textbox', { name: options.label })
  }
}

export class AppListPage extends BasePage {
  async fillCreateAppForm() {
    await this.getTextBox({ label: 'Name' }).fill(this.appName)
    await this.getButton({ label: 'Create App' }).click()
    // check if the modal is closed
    await expect(this.getModal()).toBeHidden()
  }

  getAppName() {
    return this.getByExactText(this.appName)
  }

  async goto() {
    await this.page.goto(PageType.AppList)
  }

  async onLoad() {
    // check that we don't have app with the same name
    await expect(this.getByExactText(this.appName)).toBeHidden()
  }

  async openCreateAppModal() {
    await this.getButton({ label: ariaLabels.createAppButton }).click()
    // check if the modal is visible
    await expect(this.getModal()).toBeVisible()
  }

  private appName = 'New App'
}
