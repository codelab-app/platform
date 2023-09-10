import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { FIELD_TYPE } from '../../support/antd/form'
import { loginSession } from '../../support/nextjs-auth0/commands/login'

const PAGE_NAME = '_app'
const CUSTOM_PAGE_NAME = 'Home'
const TYPOGRAPHY_ELEMENT_NAME = 'Typography'
const COMPONENT_NAME = 'Google Fonts'
const COMPONENT_INSTANCE_NAME = 'Google Fonts Instance'
const FONT_DROPDOWN_NAME = 'Google Fonts Montserrat'
const FONT_VALUE = 'Montserrat'
let testApp: IAppDTO

describe('Google Fonts', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.request({ timeout: 600000, url: '/api/cypress/import' })
      .then(() => {
        return cy.request<IAppDTO>('/api/cypress/app')
      })
      .then(({ body: app }) => (testApp = app))
  })

  it('should create an instance of Google Fonts component to the _app page', () => {
    cy.visit(
      `/apps/cypress/${slugify(testApp.name)}/pages/${slugify(
        PAGE_NAME,
      )}/builder?primarySidebarKey=explorer`,
    )

    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    cy.getCuiSidebar('Explorer').getToolbarItem('Add Element').click()

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Render Type',
      type: FIELD_TYPE.SELECT,
      value: 'Component',
    })
    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Component',
      type: FIELD_TYPE.SELECT,
      value: COMPONENT_NAME,
    })

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: COMPONENT_INSTANCE_NAME,
    })

    cy.getCuiPopover('Create Element').within(() => {
      cy.getToolbarItem('Create').click()
    })

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })
  })

  it('should add items to the Google Fonts component "fonts" prop and generate the link element', () => {
    cy.getCuiTreeItemByPrimaryTitle(COMPONENT_INSTANCE_NAME).click({
      force: true,
    })

    cy.get(`.ant-tabs [aria-label="setting"]`).click()
    cy.getSpinner().should('not.exist')

    cy.get(`button span[aria-label="plus-square"]`).parent('button').click()

    cy.get('div[name="fonts.0.type"]').should('be.visible').click()

    cy.get(`.ant-select-item[title="${FONT_DROPDOWN_NAME}"]`).scrollIntoView()
    cy.get(`.ant-select-item[title="${FONT_DROPDOWN_NAME}"]`).click()

    cy.get('#render-root')
      .get(
        'link[href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap"]',
      )
      .should('exist')
  })

  it('should create a text element in a page', () => {
    cy.visit(
      `/apps/cypress/${slugify(
        testApp.name,
      )}/pages/_app/builder?primarySidebarKey=pageList`,
    )

    cy.waitForApiCalls()

    cy.getSpinner().should('not.exist')

    cy.getCuiSidebar('Pages').getToolbarItem('Create Page').click()

    cy.findByTestId('create-page-form')
      .findByLabelText('Name')
      .type(CUSTOM_PAGE_NAME)

    cy.getCuiPopover('Create Page').within(() => {
      cy.getToolbarItem('Create').click()
    })

    cy.findByText(CUSTOM_PAGE_NAME).should('exist')

    cy.getCuiTreeItemByPrimaryTitle(CUSTOM_PAGE_NAME).click()
    cy.getCuiTreeItemByPrimaryTitle(CUSTOM_PAGE_NAME).within(() => {
      cy.getToolbarItem('Open Builder').click()
    })

    cy.findByText(ROOT_ELEMENT_NAME).should('be.visible')

    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    cy.getCuiSidebar('Explorer').getToolbarItem('Add Element').first().click()

    cy.storeNewElementId()

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Render Type',
      type: FIELD_TYPE.SELECT,
      value: 'Atom',
    })

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Atom',
      type: FIELD_TYPE.SELECT,
      value: IAtomType.AntDesignTypographyText,
    })

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: TYPOGRAPHY_ELEMENT_NAME,
    })

    cy.getCuiPopover('Create Element').within(() => {
      cy.getToolbarItem('Create').click()
    })

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    cy.typeIntoTextEditor('Text with custom font')
  })

  it('should set the font of the text element', () => {
    cy.getCuiTreeItemByPrimaryTitle(TYPOGRAPHY_ELEMENT_NAME).click({
      force: true,
    })
    cy.get(`.ant-tabs [aria-label="format-painter"]`).click()
    cy.getSpinner().should('not.exist')

    cy.get('span.ant-collapse-header-text')
      .contains('Font')
      .should('exist')
      .click()

    cy.get('.font-editor__family').should('be.visible').click()

    cy.get(`.ant-select-item[title="${FONT_VALUE}"]`)
      .should('be.visible')
      .click()

    // Check css string attribute
    cy.get('#render-root')
      .get(`.ant-typography[css=" font-family: ${FONT_VALUE};"]`)
      .should('exist')

    // Check computed style
    cy.get('#render-root .ant-typography').then(($element) => {
      if ($element[0] === undefined) {
        throw new Error('Element not found')
      }

      const computedStyles = window.getComputedStyle($element[0])
      const fontFamily = computedStyles.getPropertyValue('font-family')
      expect(fontFamily).to.equal(FONT_VALUE)
    })
  })
})
