import { RoutePaths } from '@codelab/frontend-abstract-application'
import { UiKey } from '@codelab/frontend-abstract-types'
import { ITypeKind } from '@codelab/shared-abstract-core'
import { PrimitiveTypeKind } from '@codelab/shared-infra-gqlgen'

import { BasePage } from '../../setup/core/page'
import { baseTest } from '../../setup/fixtures/base.fixture'
import {
  arrayTypeName,
  enumTypeAllowedValues,
  enumTypeName,
  interfaceFieldName,
  interfaceTypeName,
  unionTypeName,
  updatedArrayTypeName,
  updatedEnumTypeName,
  updatedInterfaceFieldName,
  updatedInterfaceTypeName,
  updatedUnionTypeName,
} from './types.data'

export class TypeListPage extends BasePage {
  async createArrayType() {
    await this.getSidebar(UiKey.TypeSidebar)
      .getToolbarItem(UiKey.TypeToolbarItemCreate)
      .click()

    const form = await this.getForm(UiKey.TypeFormCreate)

    await form.fillInputText({ label: 'Name' }, arrayTypeName)
    await form.fillInputSelect({ label: 'Kind' }, ITypeKind.ArrayType)
    await form.fillInputSelect(
      { label: 'Array item type' },
      PrimitiveTypeKind.String,
    )

    await this.getPopover(UiKey.TypePopoverCreate)
      .getButton({ text: 'Create' })
      .click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async createEnumType() {
    await this.getSidebar(UiKey.TypeSidebar)
      .getToolbarItem(UiKey.TypeToolbarItemCreate)
      .click()

    const form = await this.getForm(UiKey.TypeFormCreate)

    await form.fillInputText({ label: 'Name' }, enumTypeName)
    await form.fillInputSelect({ label: 'Kind' }, ITypeKind.EnumType)

    for (let i = 0; i < enumTypeAllowedValues.length; i++) {
      const enumItem = enumTypeAllowedValues[i]!

      await this.page.locator('button span[aria-label="plus-square"]').click()
      await this.page
        .locator(`input[name="allowedValues.${i}.key"]`)
        .type(enumItem.key)
      await this.page
        .locator(`input[name="allowedValues.${i}.value"]`)
        .type(enumItem.value)
    }

    await this.getPopover(UiKey.TypePopoverCreate)
      .getButton({ text: 'Create' })
      .click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async createInterfaceField() {
    await this.getTreeItemByPrimaryTitle$(interfaceTypeName).hover()
    await this.getTreeItemByPrimaryTitle(interfaceTypeName)
      .getToolbarItem(UiKey.FieldToolbarItemCreate)
      .click()

    const form = await this.getForm(UiKey.FieldFormCreate)

    await form.fillInputText({ label: 'Key' }, interfaceFieldName)
    await form.fillInputSelect({ label: 'Type' }, PrimitiveTypeKind.String)
    await form.fillInputText({ label: 'Default values' }, 'default string')

    await this.getPopover(UiKey.FieldPopoverCreate)
      .getButton({ text: 'Create' })
      .click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async createInterfaceType() {
    await this.getSidebar(UiKey.TypeSidebar)
      .getToolbarItem(UiKey.TypeToolbarItemCreate)
      .click()

    const form = await this.getForm(UiKey.TypeFormCreate)

    await form.fillInputText({ label: 'Name' }, interfaceTypeName)
    await form.fillInputSelect({ label: 'Kind' }, ITypeKind.InterfaceType)

    await this.getPopover(UiKey.TypePopoverCreate)
      .getButton({ text: 'Create' })
      .click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async createUnionType() {
    await this.getSidebar(UiKey.TypeSidebar)
      .getToolbarItem(UiKey.TypeToolbarItemCreate)
      .click()

    const form = await this.getForm(UiKey.TypeFormCreate)

    await form.fillInputText({ label: 'Name' }, unionTypeName)
    await form.fillInputSelect({ label: 'Kind' }, ITypeKind.UnionType)
    await form.fillInputMultiSelect({ name: 'unionTypeIds' }, [
      PrimitiveTypeKind.Boolean,
      PrimitiveTypeKind.String,
    ])

    await this.getPopover(UiKey.TypePopoverCreate)
      .getButton({ text: 'Create' })
      .click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async deleteFieldType(fieldName: string) {
    const fieldTreeNode = this.getTreeItemByPrimaryTitle$(fieldName)

    const interfaceTreeNode = this.page.locator(
      `.ant-tree-treenode:has-text("${updatedInterfaceTypeName}")`,
    )

    await interfaceTreeNode.getByLabel('plus-square').click()
    await fieldTreeNode.hover()
    await this.getTreeItemByPrimaryTitle(fieldName)
      .getToolbarItem(UiKey.FieldToolbarItemDelete)
      .click()

    await this.clickPopconfirmButton(UiKey.FieldToolbarItemDelete)

    await this.expectGlobalProgressBarToBeHidden()
  }

  async deleteType(typeName: string) {
    await this.getTreeItemByPrimaryTitle$(typeName).hover()
    await this.getTreeItemByPrimaryTitle(typeName)
      .getToolbarItem(UiKey.TypeToolbarItemDelete)
      .click()

    await this.clickPopconfirmButton(UiKey.TypeToolbarItemDelete)
    await this.expectGlobalProgressBarToBeHidden()
  }

  async goto() {
    await this.page.goto(RoutePaths.Type.base())
  }

  async updateArrayType() {
    await this.getTreeItemByPrimaryTitle$(arrayTypeName).click()

    const form = await this.getForm(UiKey.TypeFormUpdate)

    await form.fillInputText({ label: 'Name' }, updatedArrayTypeName)
    // Cannot disconnect required field
    // await form.fillInputSelect(
    //   { label: 'Array Item Type' },
    //   PrimitiveTypeKind.Boolean,
    // )

    await this.getPopover(UiKey.TypePopoverUpdate)
      .getButton({ text: 'Update' })
      .click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async updateEnumType() {
    await this.getTreeItemByPrimaryTitle$(enumTypeName).click()

    const form = await this.getForm(UiKey.TypeFormUpdate)

    await form.fillInputText({ label: 'Name' }, updatedEnumTypeName)

    await this.getPopover(UiKey.TypePopoverUpdate)
      .getButton({ text: 'Update' })
      .click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async updateInterfaceField() {
    const fieldTreeNode = this.getTreeItemByPrimaryTitle$(interfaceFieldName)
    const form = await this.getForm(UiKey.FieldFormUpdate)

    const interfaceTreeNode = this.page.locator(
      `.ant-tree-treenode:has-text("${interfaceTypeName}")`,
    )

    await interfaceTreeNode.getByLabel('plus-square').click()
    await fieldTreeNode.click()
    await form.fillInputText({ label: 'Key' }, updatedInterfaceFieldName)

    await this.getPopover(UiKey.FieldPopoverUpdate)
      .getButton({ text: 'Update' })
      .click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async updateInterfaceType() {
    await this.getTreeItemByPrimaryTitle$(interfaceTypeName).click()

    const form = await this.getForm(UiKey.TypeFormUpdate)

    await form.fillInputText({ label: 'Name' }, updatedInterfaceTypeName)

    await this.getPopover(UiKey.TypePopoverUpdate)
      .getButton({ text: 'Update' })
      .click()
    await this.expectGlobalProgressBarToBeHidden()
  }

  async updateUnionType() {
    await this.getTreeItemByPrimaryTitle$(unionTypeName).click()

    const form = await this.getForm(UiKey.TypeFormUpdate)

    await form.fillInputText({ label: 'Name' }, updatedUnionTypeName)
    await form.fillInputMultiSelect({ name: 'unionTypeIds' }, [
      PrimitiveTypeKind.Number,
    ])

    await this.getPopover(UiKey.TypePopoverUpdate)
      .getButton({ text: 'Update' })
      .click()
    await this.expectGlobalProgressBarToBeHidden()
  }
}

export const test = baseTest.extend<{ typesPage: TypeListPage }>({
  typesPage: async ({ context, page }, use) => {
    const typesPage = new TypeListPage(page, context)

    await use(typesPage)
  },
})
