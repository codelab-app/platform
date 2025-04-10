import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { IAtomType } from '@codelab/shared/abstract/core'
import { expect } from '@playwright/test'

import { BasePage } from '../../setup/core/page'
import { baseTest } from '../../setup/fixtures/base.fixture'

export class AtomPage extends BasePage {
  readonly atom = {
    name: 'Button',
    type: IAtomType.AntDesignButton,
  }

  readonly updatedAtom = {
    name: 'Updated Button',
  }

  async expectOnlyReactFragmentAtom() {
    return test.step('expectOnlyReactFragmentAtom', async () => {
      await expect(this.getTree().getTreeItem()).toHaveCount(1)
    })
  }

  async fillAndSubmitAtomFormCreate() {
    return test.step('fillAndSubmitAtomFormCreate', async () => {
      const form = await this.getForm(UiKey.AtomFormCreate)

      await form.fillInputText({ label: 'Name' }, this.atom.name)
      await form.fillInputSelect({ label: 'Type' }, this.atom.type)
      await this.getPopover(UiKey.AtomPopoverCreate)
        .getButton({ text: 'Create' })
        .click()

      await this.expectGlobalProgressBarToBeHidden()
    })
  }

  async fillAndSubmitAtomFormDelete() {
    return test.step('fillAndSubmitAtomFormDelete', async () => {
      const modal = await this.getModal(UiKey.AtomsModalDelete)

      await modal.getButton({ label: 'Confirmation Button' }).click()

      await this.expectGlobalProgressBarToBeHidden()
    })
  }

  async fillAndSubmitAtomFormUpdate() {
    return test.step('fillAndSubmitAtomFormUpdate', async () => {
      const form = await this.getForm(UiKey.AtomFormUpdate)

      await form.fillInputText({ label: 'Name' }, this.updatedAtom.name)
      await this.getPopover(UiKey.AtomPopoverUpdate)
        .getButton({ text: 'Update' })
        .click()

      await this.expectGlobalProgressBarToBeHidden()
    })
  }

  getAtomName() {
    return this.getByExactText(this.atom.name)
  }

  getUpdatedAtomName() {
    return this.getByExactText(this.updatedAtom.name)
  }

  async goto() {
    return test.step('goto', async () => {
      await this.page.goto(RoutePaths.Atom.base())
    })
  }
}

export const test = baseTest.extend<{ atomPage: AtomPage }>({
  atomPage: async ({ browserContext, page }, use) => {
    const atomPage = new AtomPage(page, browserContext)

    await use(atomPage)
  },
})
