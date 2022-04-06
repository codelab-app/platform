import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { TypeKind } from '@codelab/shared/abstract/core'
import { FIELD_TYPE } from '../support/antd/form/form.types'

// Primitive Type use case
const primitiveTypeName = 'Text'
const primitiveTypeKind = TypeKind.PrimitiveType
const primitiveTypePrimitiveKind = PrimitiveTypeKind.String
// Enum Type use case
const enumTypeName = 'COLORS'
const enumTypeKind = 'EnumType'

const enumTypeAllowedValues = [
  { name: 'BLACK', value: '0' },
  { name: 'WHITE', value: '1' },
]

// Array Type use case
const arrayTypeName = 'TextArray'
const arrayTypeKind = TypeKind.ArrayType
const arrayItemType = 'Text'
const updatedArrayTypeName = 'Updated TextArray'
// Interface Type use case
const interfaceTypeName = 'New Interface'
const interfaceTypeKind = TypeKind.InterfaceType

describe('Types CRUD', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login().then(() => {
        cy.visit(`/types`)
      })
    })
  })

  describe('create type', () => {
    it('should be able to create primitive', () => {
      cy.findAllByText(primitiveTypeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/ }).click()

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
        value: primitiveTypePrimitiveKind,
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

      cy.findByRole('button', { name: /plus/ }).click()

      cy.getModal().setFormFieldValue({ label: 'Name', value: enumTypeName })

      cy.getModal().setFormFieldValue({
        label: 'Kind',
        type: FIELD_TYPE.SELECT,
        value: enumTypeKind,
      })

      enumTypeAllowedValues.map((enumItem) => {
        cy.findByRole('button', { name: /plus-square/ }).click()

        // Can't use setFormFieldValue since it doesn't take previous subject
        cy.getModal().findAllByLabelText('Name').last().type(enumItem.name)
        cy.getModal().findAllByLabelText('Value').last().type(enumItem.value)
      })

      cy.getModal().getModalAction('Create').click()

      cy.getModal().should('not.exist')

      cy.findByText(primitiveTypeName).should('exist')
    })

    it('should be able to create array', () => {
      cy.findByRole('button', { name: /plus/ }).click()

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

      cy.findByRole('button', { name: /plus/ }).click()

      cy.getModal().setFormFieldValue({
        label: 'Name',
        value: interfaceTypeName,
      })

      cy.getModal().setFormFieldValue({
        label: 'Kind',
        value: interfaceTypeKind,
        type: FIELD_TYPE.SELECT,
      })

      cy.getModal()
        .getModalAction(/Create/)
        .click()

      cy.getModal().should('not.exist')
      cy.findByText(interfaceTypeName).should('exist')
    })
  })

  describe('update type', () => {
    it('should be able to update array', () => {
      cy.findAllByText(arrayTypeName, { exact: true, timeout: 3000 }).should(
        'exist',
      )

      cy.searchTableRow({
        header: 'Name',
        row: arrayTypeName,
      })
        .getButton({
          icon: 'edit',
        })
        .click()

      cy.getSpinner().should('not.exist')

      cy.getModal().setFormFieldValue({
        label: 'Name',
        value: updatedArrayTypeName,
      })
      cy.getModal()
        .getModalAction(/Update/)
        .click()

      cy.getModal().should('not.exist')
      cy.findByText(arrayTypeName).should('not.exist')
      cy.findByText(updatedArrayTypeName).should('exist')
    })
  })

  describe('delete type', () => {
    it('should be able to delete interface', () => {
      cy.searchTableRow({
        header: 'Name',
        row: interfaceTypeName,
      })
        .getButton({
          icon: 'delete',
        })
        .click()

      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(interfaceTypeName).should('not.exist')
    })

    it('should be able to delete array', () => {
      cy.searchTableRow({
        header: 'Name',
        row: updatedArrayTypeName,
      })
        .getButton({
          icon: 'delete',
        })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedArrayTypeName).should('not.exist')
    })

    it('should be able to delete enum', () => {
      cy.searchTableRow({
        header: 'Name',
        row: enumTypeName,
      })
        .getButton({
          icon: 'delete',
        })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(enumTypeName).should('not.exist')
    })

    it('should be able to delete primitive', () => {
      cy.searchTableRow({
        header: 'Name',
        row: primitiveTypeName,
      })
        .getButton({
          icon: 'delete',
        })
        .click()
      cy.getSpinner().should('not.exist')

      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.getModal().should('not.exist')

      cy.findAllByText(primitiveTypeName).should('not.exist')
    })
  })
})
