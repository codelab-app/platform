import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { EditorView } from '@codemirror/view'

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
    // Setup data creates types, so we need to clear that
    cy.postApiRequest('/admin/reset-database-except-user')
  })

  describe('create type', () => {
    it('should be able to create primitive', () => {
      cy.visit(`/types`)
      cy.findAllByText(primitiveTypeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.getCuiSidebar('Types').getCuiToolbarItem('Create Type').click()

      cy.setFormFieldValue({
        label: 'Name',
        value: primitiveTypeName,
      })

      cy.setFormFieldValue({
        label: 'Kind',
        type: FIELD_TYPE.SELECT,
        value: primitiveTypeKind,
      })

      cy.setFormFieldValue({
        label: 'Primitive kind',
        type: FIELD_TYPE.SELECT,
        value: stringPrimitiveType,
      })

      cy.intercept('POST', `api/graphql`).as('action')
      cy.getCuiPopover('Create Type').getCuiToolbarItem('Create').click()
      cy.wait('@action')

      cy.findByText(primitiveTypeName).should('exist')
    })

    it('should be able to create enum', () => {
      cy.findAllByText(enumTypeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.getCuiSidebar('Types').getCuiToolbarItem('Create Type').click()

      cy.setFormFieldValue({ label: 'Name', value: enumTypeName })

      cy.setFormFieldValue({
        label: 'Kind',
        type: FIELD_TYPE.SELECT,
        value: enumTypeKind,
      })

      enumTypeAllowedValues.map((enumItem) => {
        cy.findByRole('button', { name: /plus-square/ }).click()

        // Can't use setFormFieldValue since it doesn't take previous subject
        cy.findAllByLabelText('Key').last().type(enumItem.key)
        cy.findAllByLabelText('Value').last().type(enumItem.value)
      })

      cy.intercept('POST', `api/graphql`).as('action')
      cy.getCuiPopover('Create Type').getCuiToolbarItem('Create').click()
      cy.wait('@action')

      cy.findByText(primitiveTypeName).should('exist')
    })

    it('should be able to create array', () => {
      cy.getCuiSidebar('Types').getCuiToolbarItem('Create Type').click()

      cy.setFormFieldValue({
        label: 'Name',
        value: arrayTypeName,
      })

      cy.setFormFieldValue({
        label: 'Kind',
        type: FIELD_TYPE.SELECT,
        value: arrayTypeKind,
      })

      cy.setFormFieldValue({
        label: 'Array item type',
        type: FIELD_TYPE.SELECT,
        value: arrayItemType,
      })

      cy.intercept('POST', `api/graphql`).as('action')
      cy.getCuiPopover('Create Type').getCuiToolbarItem('Create').click()
      cy.wait('@action')

      cy.findByText(primitiveTypeName).should('exist')
    })

    it('should be able to create interface', () => {
      cy.findAllByText(interfaceTypeName, { exact: true, timeout: 0 }).should(
        'not.exist',
      )

      cy.getCuiSidebar('Types').getCuiToolbarItem('Create Type').click()

      cy.setFormFieldValue({
        label: 'Name',
        value: interfaceTypeName,
      })

      cy.setFormFieldValue({
        label: 'Kind',
        type: FIELD_TYPE.SELECT,
        value: interfaceTypeKind,
      })

      cy.intercept('POST', `api/graphql`).as('action')
      cy.getCuiPopover('Create Type').getCuiToolbarItem('Create').click()
      cy.wait('@action')

      cy.findByText(interfaceTypeName).should('exist')
    })

    it('should be able to add fields', () => {
      cy.getCuiTreeItemByPrimaryTitle(interfaceTypeName).click()

      cy.getCuiTreeItemByPrimaryTitle(interfaceTypeName)
        .getCuiTreeItemToolbar()
        .getCuiToolbarItem('Add field')
        .click()

      cy.setFormFieldValue({
        label: 'Key',
        value: fieldName,
      })

      cy.setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: primitiveTypeName,
      })

      // // should show error because nullable is false by default
      // cy.getCuiPopover('Create Field').within(() => {
      //   cy.getToolbarItem('Create').should('be.exist').click({ force: true })
      // })

      // cy.findByText('Default values is required if not nullable')

      cy.setFormFieldValue({
        label: 'Default values',
        type: FIELD_TYPE.CODE_MIRROR,
        value: fieldDefaultValue,
      })

      cy.findByText(fieldDefaultValue).should('be.visible')

      cy.intercept('POST', `api/graphql`).as('action')
      cy.getCuiToolbarItem('Create').click()
      cy.wait('@action')
      // its re-rendering after saving and is flaky when running in CI
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)

      // cy.getCuiTreeItemByPrimaryTitle(interfaceTypeName).click()
      cy.getCuiTreeItemByPrimaryTitle(fieldName).should('be.visible')

      cy.getCuiTreeItemByPrimaryTitle(fieldName).click()

      cy.getFormInput({
        label: 'Type',
        type: FIELD_TYPE.MULTISELECT,
      })
        .get('.ant-select-selection-item')
        .invoke('text')
        .should('equal', primitiveTypeName)

      cy.getFormInput({
        label: 'Default values',
        type: FIELD_TYPE.CODE_MIRROR,
      }).then((editorView: EditorView) => {
        const text = editorView.state.doc.toString()

        expect(text).to.equal(fieldDefaultValue)
      })
    })
  })

  describe('update type', () => {
    it('should be able to update array', () => {
      cy.visit(`/types`)

      cy.findAllByText(arrayTypeName, { exact: true }).should('exist')

      cy.getCuiTreeItemByPrimaryTitle(arrayTypeName).click()

      cy.waitForSpinners()

      cy.setFormFieldValue({
        label: 'Name',
        value: updatedArrayTypeName,
      })

      cy.intercept('POST', `api/graphql`).as('action')
      cy.getButton({ label: 'Update Type' }).click()
      cy.wait('@action')

      cy.getCuiTreeItemByPrimaryTitle(arrayTypeName).should('not.exist')
      cy.getCuiTreeItemByPrimaryTitle(updatedArrayTypeName).should('exist')
    })
  })

  describe('delete type', () => {
    it('should be able to delete interface', () => {
      cy.getCuiTreeItemByPrimaryTitle(interfaceTypeName).click()
      cy.getCuiTreeItemByPrimaryTitle(interfaceTypeName)
        .getCuiTreeItemToolbar()
        .getCuiToolbarItem('Delete type')
        .should('be.visible')
        .click()

      cy.waitForSpinners()

      cy.intercept('POST', `api/graphql`).as('action')
      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.wait('@action')
      cy.getModal().should('not.exist')

      cy.getCuiTreeItemByPrimaryTitle(interfaceTypeName).should('not.exist')
    })

    it('should be able to delete array', () => {
      cy.getCuiTreeItemByPrimaryTitle(updatedArrayTypeName).click()
      cy.getCuiTreeItemByPrimaryTitle(updatedArrayTypeName)
        .getCuiTreeItemToolbar()
        .getCuiToolbarItem('Delete type')
        .should('be.visible')
        .click()

      cy.waitForSpinners()

      cy.intercept('POST', `api/graphql`).as('action')
      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.wait('@action')
      cy.getModal().should('not.exist')

      cy.findAllByText(updatedArrayTypeName).should('not.exist')
    })

    it('should be able to delete enum', () => {
      cy.getCuiTreeItemByPrimaryTitle(enumTypeName).click()
      cy.getCuiTreeItemByPrimaryTitle(enumTypeName)
        .getCuiTreeItemToolbar()
        .getCuiToolbarItem('Delete type')
        .should('be.visible')
        .click()

      cy.waitForSpinners()

      cy.intercept('POST', `api/graphql`).as('action')
      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.wait('@action')
      cy.getModal().should('not.exist')

      cy.findAllByText(enumTypeName).should('not.exist')
    })

    it('should be able to delete primitive', () => {
      cy.getCuiTreeItemByPrimaryTitle(primitiveTypeName).click()
      cy.getCuiTreeItemByPrimaryTitle(primitiveTypeName)
        .getCuiTreeItemToolbar()
        .getCuiToolbarItem('Delete type')
        .should('be.visible')
        .click()

      cy.waitForSpinners()

      cy.intercept('POST', `api/graphql`).as('action')
      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.wait('@action')
      cy.getModal().should('not.exist')

      cy.findAllByText(primitiveTypeName).should('not.exist')
    })
  })
})
