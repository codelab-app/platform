import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { FIELD_TYPE } from '../support/antd/form'
import { loginSession } from '../support/nextjs-auth0/commands/login'

// Primitive Type use case
const primitiveTypeName = 'Text'
const primitiveTypeKind = ITypeKind.PrimitiveType
const stringPrimitiveType = IPrimitiveTypeKind.String
// Enum Type use case
const enumTypeName = 'COLORS'
const enumTypeKind = 'EnumType'

const enumTypeAllowedValues = [
  { key: 'BLACK', value: '0' },
  { key: 'WHITE', value: '1' },
]

// Array Type use case
const arrayTypeName = 'TextArray'
const arrayTypeKind = ITypeKind.ArrayType
const arrayItemType = 'Text'
const updatedArrayTypeName = 'Updated TextArray'
// Interface Type use case
const interfaceTypeName = 'New Interface'
const interfaceTypeKind = ITypeKind.InterfaceType
// Field
const fieldName = 'Name'
const fieldDefaultValue = 'something default'

describe('Types CRUD', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()
    cy.visit(`/types`)
  })

  describe('create type', () => {
    it('should be able to create primitive', () => {
      cy.findAllByText(primitiveTypeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.getCuiSidebar('Types').getToolbarItem('Create Type').click()

      cy.getModal().setFormFieldValue({
        label: 'Name',
        value: primitiveTypeName,
      })

      cy.getModal().setFormFieldValue({
        label: 'Kind',
        type: FIELD_TYPE.SELECT,
        value: primitiveTypeKind,
      })

      cy.getModal().setFormFieldValue({
        label: 'Primitive kind',
        type: FIELD_TYPE.SELECT,
        value: stringPrimitiveType,
      })

      cy.getModal()
        .getModalAction(/Create/)
        .click()

      cy.getModal().should('not.exist')
      cy.findByText(primitiveTypeName).should('exist')
    })

    it('should be able to create enum', () => {
      cy.findAllByText(enumTypeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.getCuiSidebar('Types').getToolbarItem('Create Type').click()

      cy.getModal().setFormFieldValue({ label: 'Name', value: enumTypeName })

      cy.getModal().setFormFieldValue({
        label: 'Kind',
        type: FIELD_TYPE.SELECT,
        value: enumTypeKind,
      })

      enumTypeAllowedValues.map((enumItem) => {
        cy.findByRole('button', { name: /plus-square/ }).click()

        // Can't use setFormFieldValue since it doesn't take previous subject
        cy.getModal().findAllByLabelText('Key').last().type(enumItem.key)
        cy.getModal().findAllByLabelText('Value').last().type(enumItem.value)
      })

      cy.getModal().getModalAction('Create').click()

      cy.getModal().should('not.exist')

      cy.findByText(primitiveTypeName).should('exist')
    })

    it('should be able to create array', () => {
      cy.getCuiSidebar('Types').getToolbarItem('Create Type').click()

      cy.getModal().setFormFieldValue({
        label: 'Name',
        value: arrayTypeName,
      })

      cy.getModal().setFormFieldValue({
        label: 'Kind',
        type: FIELD_TYPE.SELECT,
        value: arrayTypeKind,
      })

      cy.getModal().setFormFieldValue({
        label: 'Array item type',
        type: FIELD_TYPE.SELECT,
        value: arrayItemType,
      })

      cy.getModal()
        .getModalAction(/Create/)
        .click()

      cy.getModal().should('not.exist')
      cy.findByText(primitiveTypeName).should('exist')
    })

    it('should be able to create interface', () => {
      cy.findAllByText(interfaceTypeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.getCuiSidebar('Types').getToolbarItem('Create Type').click()

      cy.getModal().setFormFieldValue({
        label: 'Name',
        value: interfaceTypeName,
      })

      cy.getModal().setFormFieldValue({
        label: 'Kind',
        type: FIELD_TYPE.SELECT,
        value: interfaceTypeKind,
      })

      cy.getModal()
        .getModalAction(/Create/)
        .click()

      cy.getModal().should('not.exist')
      cy.findByText(interfaceTypeName).should('exist')
    })

    it('should be able to add fields', () => {
      cy.getCuiTreeItemByPrimaryTitle(interfaceTypeName).click()

      cy.getCuiTreeItemByPrimaryTitle(interfaceTypeName)
        .getCuiTreeItemToolbar()
        .getToolbarItem('Add field')
        .click()

      cy.getModal().setFormFieldValue({
        label: 'Key',
        value: fieldName,
      })

      cy.getModal().setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: primitiveTypeName,
      })

      // should show error because nullable is false by default
      cy.getModal()
        .getModalAction(/Create/)
        .click()

      cy.getModal().findByText('Default values is required if not nullable')

      cy.getModal().setFormFieldValue({
        label: 'Default values',
        type: FIELD_TYPE.CODE_MIRROR,
        value: fieldDefaultValue,
      })

      cy.getModal()
        .getModalAction(/Create/)
        .click()

      cy.getModal().should('not.exist')

      cy.getCuiTreeItemByPrimaryTitle(fieldName).should('be.visible')

      cy.getCuiTreeItemByPrimaryTitle(fieldName).click()

      // TODO: update these to assert the values of the form input instead of table cell.
      // cy.searchTableRow({
      //   header: 'Kind',
      //   row: primitiveTypeKind,
      //   table: cy.get('.ant-table-expanded-row'),
      // })

      // cy.searchTableRow({
      //   header: 'Default',
      //   row: fieldDefaultValue,
      //   table: cy.get('.ant-table-expanded-row'),
      // })
    })
  })

  describe('update type', () => {
    it('should be able to update array', () => {
      cy.visit(`/types`)

      cy.findAllByText(arrayTypeName, { exact: true }).should('exist')

      cy.getCuiTreeItemByPrimaryTitle(arrayTypeName).click()

      cy.getSpinner().should('not.exist')

      cy.setFormFieldValue({
        label: 'Name',
        value: updatedArrayTypeName,
      })

      cy.getButton({ label: 'Update Type' }).click()

      cy.getCuiTreeItemByPrimaryTitle(arrayTypeName).should('not.exist')
      cy.getCuiTreeItemByPrimaryTitle(updatedArrayTypeName).should('exist')
    })
  })

  describe('delete type', () => {
    it('should be able to delete interface', () => {
      cy.getCuiTreeItemByPrimaryTitle(interfaceTypeName).click()
      cy.getCuiTreeItemByPrimaryTitle(interfaceTypeName).within(() => {
        cy.getCuiTreeItemToolbar()
          .getToolbarItem('Delete type')
          .should('be.visible')
          .click()
      })

      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.getCuiTreeItemByPrimaryTitle(interfaceTypeName).should('not.exist')
    })

    it('should be able to delete array', () => {
      cy.getCuiTreeItemByPrimaryTitle(updatedArrayTypeName).click()
      cy.getCuiTreeItemByPrimaryTitle(updatedArrayTypeName).within(() => {
        cy.getCuiTreeItemToolbar()
          .getToolbarItem('Delete type')
          .should('be.visible')
          .click()
      })

      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedArrayTypeName).should('not.exist')
    })

    it('should be able to delete enum', () => {
      cy.getCuiTreeItemByPrimaryTitle(enumTypeName).click()
      cy.getCuiTreeItemByPrimaryTitle(enumTypeName).within(() => {
        cy.getCuiTreeItemToolbar()
          .getToolbarItem('Delete type')
          .should('be.visible')
          .click()
      })

      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(enumTypeName).should('not.exist')
    })

    it('should be able to delete primitive', () => {
      cy.getCuiTreeItemByPrimaryTitle(primitiveTypeName).click()
      cy.getCuiTreeItemByPrimaryTitle(primitiveTypeName).within(() => {
        cy.getCuiTreeItemToolbar()
          .getToolbarItem('Delete type')
          .should('be.visible')
          .click()
      })

      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(primitiveTypeName).should('not.exist')
    })
  })
})
