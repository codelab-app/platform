import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { test as base, expect } from '@playwright/test'

import { BasePage } from '../../locators/pages'

export class AtomPage extends BasePage {
  readonly atom = {
    name: 'Button',
  }

  readonly updatedAtom = {
    name: 'Updated Button',
  }

  async expectOnlyReactFragmentAtom() {
    await expect(this.getTree().getTreeItem()).toHaveCount(1)
  }

  async fillAndSubmitAtomFormCreate() {
    const form = await this.getForm(UiKey.AtomFormCreate)

    await form.fillInputText({ label: 'Name' }, this.atom.name)
    await form.fillInputFilterSelect({ label: 'Type' }, this.atom.name)
    await form.getButton({ text: 'Create' }).click()

    await this.expectGlobalProgressBarToBeHidden()
  }

  async fillAndSubmitAtomFormDelete() {
    const form = await this.getForm(UiKey.AtomsModalDelete)

    await form.getButton({ label: 'Confirmation Button' }).click()

    await this.expectGlobalProgressBarToBeHidden()
  }

  async fillAndSubmitAtomFormUpdate() {
    const form = await this.getForm(UiKey.AtomFormUpdate)

    await form.fillInputText({ label: 'Name' }, this.updatedAtom.name)
    await form.getButton({ text: 'Update' }).click()

    await this.expectGlobalProgressBarToBeHidden()
  }

  getAtomName() {
    return this.getByExactText(this.atom.name)
  }

  getUpdatedAtomName() {
    return this.getByExactText(this.updatedAtom.name)
  }

  async goto() {
    await this.page.goto(PageType.Atoms())
  }
}

export const test = base.extend<{ atomPage: AtomPage }>({
  atomPage: async ({ page }, use) => {
    const atomPage = new AtomPage(page)

    await use(atomPage)
  },
})
