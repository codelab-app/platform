import { PrimitiveTypeKind, TypeKind } from '@codelab/shared/abstract/core'

// Primitive Type use case
const primitiveTypeName = 'Text'
const primitiveTypeKind = TypeKind.PrimitiveType
const primitiveTypePrimitiveKind = PrimitiveTypeKind.String
// Enum Type use case
const enumTypeName = 'COLORS'
const enumTypeKind = 'Enum'

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

const findEditButtonByTypeName = (text: string) =>
  cy
    .findByText(text, { exact: true, timeout: 3000 })
    .closest('.ant-table-row')
    .find('.anticon-edit')
    .closest('button')

const findDeleteButtonByTypeName = (text: string) =>
  cy
    .findByText(text, { exact: true, timeout: 3000 })
    .closest('.ant-table-row')
    .find('.anticon-delete')
    .closest('button')

describe('Types', () => {
  before(() => {
    cy.resetDgraphData().then(() => {
      cy.login().then(() => {
        cy.preserveAuthCookies()
        cy.visit(`/types`)
      })
    })
  })

  beforeEach(() => {
    cy.preserveAuthCookies()
    cy.get('.ant-table-cell', { timeout: 5000 })
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
      cy.getOpenedModal().getOptionItem(enumTypeKind).first().click()

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
      cy.getSelectOptionItemByValue(interfaceTypeKind).first().click()
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

      findEditButtonByTypeName(arrayTypeName).click()

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
      findDeleteButtonByTypeName(interfaceTypeName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete/)
        .click()

      cy.findAllByText(interfaceTypeName).should('not.exist')
    })

    it('should be able to delete array', () => {
      findDeleteButtonByTypeName(updatedArrayTypeName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete/)
        .click()

      cy.findAllByText(updatedArrayTypeName).should('not.exist')
    })

    it('should be able to delete enum', () => {
      findDeleteButtonByTypeName(enumTypeName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete/)
        .click()

      cy.findAllByText(enumTypeName).should('not.exist')
    })

    it('should be able to delete primitive', () => {
      findDeleteButtonByTypeName(primitiveTypeName).click()

      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete/)
        .click()

      cy.findAllByText(primitiveTypeName).should('not.exist')
    })
  })
})
