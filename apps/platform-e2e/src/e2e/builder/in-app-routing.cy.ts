import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { FIELD_TYPE } from '../../support/antd/form'
import { loginSession } from '../../support/nextjs-auth0/commands/login'

const TestPageText = 'this is the test page'
const DynamicPageText = 'this is the dynamic page'
const GoToTestPageText = 'go to test page'
const GoToDynamicPageText = 'go to dynamic page'
const dynamicUrlSegment1 = 'first-url-segment'
const dynamicUrlSegment2 = 'second-url-segment'

describe('Routing between app pages within the builder', () => {
  let app: IAppDTO
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.request('/api/cypress/type')

    cy.request('/api/cypress/atom')
      .then(() => cy.request<IAppDTO>('/api/cypress/app'))
      .then((apps) => {
        app = apps.body
      })
  })

  it('should create a page with a static url - /test-page', () => {
    // create the page to route to
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder?primarySidebarKey=pageList`,
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.getSpinner().should('not.exist')

    cy.getCuiSidebar('Pages').getToolbarItem('Create Page').first().click()

    cy.findByTestId('create-page-form')
      .findByLabelText('Name')
      .type('Test Page')
    cy.findByTestId('create-page-form')
      .findByLabelText('Deployed Page URL')
      .type('/test-page')
    cy.findByTestId('create-page-form')
      .getButton({ label: 'Create Page' })
      .click()

    cy.findByTestId('create-page-form').should('not.exist')
  })

  it('should create a page with a dynamic url - /tests/:testId/subtests/:subtestId', () => {
    cy.getCuiSidebar('Pages').getToolbarItem('Create Page').first().click()

    cy.findByTestId('create-page-form')
      .findByLabelText('Name')
      .type('Test Dynamic Page')
    cy.findByTestId('create-page-form')
      .findByLabelText('Deployed Page URL')
      .type('/tests/:testId/subtests/:subtestId')
    cy.findByTestId('create-page-form')
      .getButton({ label: 'Create Page' })
      .click()

    cy.findByTestId('create-page-form').should('not.exist')
  })

  it('should create a text element in the test-dynamic-page', () => {
    // go to the regular page
    cy.visit(
      `/apps/cypress/codelab-app/pages/test-dynamic-page/builder?primarySidebarKey=explorer`,
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.getSpinner().should('not.exist')

    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    cy.getCuiSidebar('Explorer').getToolbarItem('Add Element').first().click()

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
      value: 'Typography Element',
    })

    cy.findByTestId('create-element-form')
      .getButton({ label: 'Create Element' })
      .click()

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    cy.getCuiTreeItemByPrimaryTitle('Typography Element').click({ force: true })
    cy.get(`.ant-tabs [aria-label="setting"]`).click()
    cy.get('.ant-tabs-tabpane-active form .ql-editor').type(
      `${DynamicPageText} - {{url.testId}} - {{url.subtestId}}`,
      {
        parseSpecialCharSequences: false,
      },
    )

    cy.get('#render-root')
      .findByText(`${DynamicPageText} - undefined - undefined`)
      .should('exist')
  })

  it('should create a text element in the test-page', () => {
    // go to the regular page
    cy.visit(
      `/apps/cypress/codelab-app/pages/test-page/builder?primarySidebarKey=explorer`,
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.getSpinner().should('not.exist')

    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    cy.getCuiSidebar('Explorer').getToolbarItem('Add Element').first().click()

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
      value: 'Typography Element',
    })

    cy.findByTestId('create-element-form')
      .getButton({ label: 'Create Element' })
      .click()

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    cy.getCuiTreeItemByPrimaryTitle('Typography Element').click({ force: true })
    cy.get(`.ant-tabs [aria-label="setting"]`).click()
    cy.get('.ant-tabs-tabpane-active form .ql-editor').type(TestPageText, {
      parseSpecialCharSequences: false,
    })

    cy.get('#render-root').findByText(TestPageText).should('exist')
  })

  it('should create a NextLink in the test-page to go to the dynamic page', () => {
    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    cy.getCuiSidebar('Explorer').getToolbarItem('Add Element').first().click()
    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Render Type',
      type: FIELD_TYPE.SELECT,
      value: 'Atom',
    })
    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Atom',
      type: FIELD_TYPE.SELECT,
      value: IAtomType.NextLink,
    })

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: 'Next Link Element',
    })

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Props Data',
      type: FIELD_TYPE.INPUT,
      value: `{ "href": "/tests/${dynamicUrlSegment1}/subtests/${dynamicUrlSegment2}" }`,
    })

    cy.findByTestId('create-element-form')
      .getButton({ label: 'Create Element' })
      .click()

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    cy.getCuiTreeItemByPrimaryTitle('Next Link Element').click({ force: true })
    cy.get(`.ant-tabs [aria-label="setting"]`).click()
    cy.get('.ant-tabs-tabpane-active form .ql-editor').type(
      GoToDynamicPageText,
      {
        parseSpecialCharSequences: false,
      },
    )

    cy.get('#render-root').findByText(GoToDynamicPageText).should('exist')
  })

  it('should create a NextLink in the provider with link to the test-page', () => {
    // go to the provider page
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder?primarySidebarKey=explorer`,
    )

    // select root now so we can update its child later
    // there is an issue with tree interaction
    // Increased timeout since builder may take longer to load
    cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
      .should('be.visible')
      .click({ force: true })

    cy.getCuiSidebar('Explorer').getToolbarItem('Add Element').first().click()

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Render Type',
      type: FIELD_TYPE.SELECT,
      value: 'Atom',
    })
    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Atom',
      type: FIELD_TYPE.SELECT,
      value: IAtomType.NextLink,
    })

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: 'Next Link Element',
    })

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Props Data',
      type: FIELD_TYPE.INPUT,
      value: '{ "href": "/test-page" }',
    })

    cy.findByTestId('create-element-form')
      .getButton({ label: 'Create Element' })
      .click()

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    cy.getCuiTreeItemByPrimaryTitle('Next Link Element').click({ force: true })
    cy.get(`.ant-tabs [aria-label="setting"]`).click()
    cy.get('.ant-tabs-tabpane-active form .ql-editor').type(GoToTestPageText, {
      parseSpecialCharSequences: false,
    })

    cy.get('#render-root').findByText(GoToTestPageText).should('exist')
  })

  it('should navigate to /test-page of the app within the builder when NextLink in the provider is clicked', () => {
    cy.get('#render-root').findByText(GoToTestPageText).click()
    cy.findByText(TestPageText).should('exist')
  })

  it('should navigate to the dynamic page within the builder when NextLink in the /test-page is clicked', () => {
    cy.get('#render-root').findByText(GoToDynamicPageText).click()
    cy.findByText(
      `${DynamicPageText} - ${dynamicUrlSegment1} - ${dynamicUrlSegment2}`,
    ).should('exist')
  })
})
