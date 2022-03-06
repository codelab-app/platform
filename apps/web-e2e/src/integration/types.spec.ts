import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen-v2'
import { TypeKind } from '@codelab/shared/abstract/core'
import { domClasses } from '../support/selectors/domClasses'

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

      cy.getOpenedModal().findByLabelText('Name').type(primitiveTypeName)
      cy.getOpenedModal().findByLabelText('Kind').click()
      cy.getOpenedModal().getOptionItem(primitiveTypeKind).first().click()
      cy.getOpenedModal().findByLabelText('Primitive kind').click()
      cy.getOpenedModal()
        .getOptionItem(primitiveTypePrimitiveKind)
        .first()
        .click()

      cy.getOpenedModal()
        .findByButtonText(/Create/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(primitiveTypeName).should('exist')
    })

    it('should be able to create enum', () => {
      cy.findAllByText(enumTypeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/ }).click()

      cy.getOpenedModal().findByLabelText('Name').type(enumTypeName)
      cy.getOpenedModal().findByLabelText('Kind').click()
      cy.getOpenedModal().getOptionItem(enumTypeKind).click()

      enumTypeAllowedValues.map((enumItem) => {
        cy.findByRole('button', { name: /plus-square/ }).click()

        cy.getOpenedModal()
          .findAllByLabelText('Name')
          .last()
          .type(enumItem.name)
        cy.getOpenedModal()
          .findAllByLabelText('Value')
          .last()
          .type(enumItem.value)
      })

      cy.getOpenedModal()
        .findByButtonText(/Create/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(primitiveTypeName).should('exist')
    })

    it('should be able to create array', () => {
      cy.findAllByText(arrayTypeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/ }).click()

      cy.getOpenedModal().findByLabelText('Name').type(arrayTypeName)
      cy.getOpenedModal().findByLabelText('Kind').click()
      cy.getOpenedModal().getOptionItem(arrayTypeKind).first().click()
      cy.getOpenedModal().findByLabelText('Array item type').click()
      cy.getOpenedModal().getOptionItem(arrayItemType).first().click()

      cy.getOpenedModal()
        .findByButtonText(/Create/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(primitiveTypeName).should('exist')
    })

    it('should be able to create interface', () => {
      cy.findAllByText(interfaceTypeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.findByRole('button', { name: /plus/ }).click()

      cy.getOpenedModal().findByLabelText('Name').type(interfaceTypeName)
      cy.getOpenedModal().findByLabelText('Kind').click()
      cy.getOptionItem(interfaceTypeKind).first().click()
      cy.getOpenedModal()
        .findByButtonText(/Create/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(interfaceTypeName).should('exist')
    })
  })

  describe('update type', () => {
    it('should be able to update array', () => {
      cy.findAllByText(arrayTypeName, { exact: true, timeout: 3000 }).should(
        'exist',
      )

      cy.findButtonByItemText(
        arrayTypeName,
        domClasses.buttons.edit,
        domClasses.tableRow,
      ).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByLabelText('Name')
        .clear()
        .type(updatedArrayTypeName)

      cy.getOpenedModal()
        .findByButtonText(/Update/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(arrayTypeName).should('not.exist')
      cy.findByText(updatedArrayTypeName).should('exist')
    })
  })

  describe('delete type', () => {
    it('should be able to delete interface', () => {
      cy.findButtonByItemText(
        interfaceTypeName,
        domClasses.buttons.delete,
        domClasses.tableRow,
      ).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete/)
        .click()

      cy.findAllByText(interfaceTypeName).should('not.exist')
    })

    it('should be able to delete array', () => {
      cy.findButtonByItemText(
        updatedArrayTypeName,
        domClasses.buttons.delete,
        domClasses.tableRow,
      ).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete/)
        .click()

      cy.findAllByText(updatedArrayTypeName).should('not.exist')
    })

    it('should be able to delete enum', () => {
      cy.findButtonByItemText(
        enumTypeName,
        domClasses.buttons.delete,
        domClasses.tableRow,
      ).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete/)
        .click()

      cy.findAllByText(enumTypeName).should('not.exist')
    })

    it('should be able to delete primitive', () => {
      cy.findButtonByItemText(
        primitiveTypeName,
        domClasses.buttons.delete,
        domClasses.tableRow,
      ).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete/)
        .click()

      cy.findAllByText(primitiveTypeName).should('not.exist')
    })
  })
})
