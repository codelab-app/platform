import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { App } from '@codelab/shared/abstract/codegen'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { slugify } from '@codelab/shared/utils'

const TestPageText = 'this is the test page'
const DynamicPageText = 'this is the dynamic page'
const GoToTestPageText = 'go to test page'
const GoToDynamicPageText = 'go to dynamic page'
const dynamicUrlSegment1 = 'first-url-segment'
const dynamicUrlSegment2 = 'second-url-segment'

describe('Routing between app pages within the builder', () => {
  let app: IAppDto

  before(() => {
    cy.postApiRequest<App>('/app/seed-cypress-app').then(
      ({ body }) => (app = body),
    )
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
    cy.waitForSpinners()

    cy.getCuiSidebar('Pages').getCuiToolbarItem('Create Page').first().click()

    cy.findByTestId('create-page-form')
      .findByLabelText('Name')
      .type('Test Page')
    cy.findByTestId('create-page-form')
      .findByLabelText('Deployed Page URL')
      .type('/test-page')

    cy.getCuiPopover('Create Page').getCuiToolbarItem('Create').click()

    cy.findByTestId('create-page-form').should('not.exist')
  })

  it('should create a page with a dynamic url - /tests/:testId/subtests/:subtestId', () => {
    cy.getCuiSidebar('Pages').getCuiToolbarItem('Create Page').first().click()

    cy.findByTestId('create-page-form')
      .findByLabelText('Name')
      .type('Test Dynamic Page')
    cy.findByTestId('create-page-form')
      .findByLabelText('Deployed Page URL')
      .type('/tests/:testId/subtests/:subtestId')

    cy.getCuiPopover('Create Page').getCuiToolbarItem('Create').click()

    cy.findByTestId('create-page-form').should('not.exist')
  })

  it('should create a text element in the test-dynamic-page', () => {
    // go to the regular page
    cy.visit(
      `/apps/cypress/codelab-app/pages/test-dynamic-page/builder?primarySidebarKey=explorer`,
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.waitForSpinners()

    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    cy.getCuiSidebar('Explorer')
      .getCuiToolbarItem('Add Element')
      .first()
      .click()

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Atom',
      type: FIELD_TYPE.SELECT,
      value: IAtomType.AntDesignTypographyText,
    })

    // need to wait for the code to put the autocomputed name before typing
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: 'Typography Element',
    })

    cy.getCuiPopover('Create Element').getCuiToolbarItem('Create').click()

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    // editorjs fails internally without this, maybe some kind of initialization - Cannot read properties of undefined (reading 'contains')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)

    cy.getCuiTreeItemByPrimaryTitle('Typography Element').click({
      force: true,
    })

    cy.typeIntoTextEditor(
      `${DynamicPageText} - {{url.testId}} - {{url.subtestId}}`,
    )

    cy.waitForApiCalls()

    cy.openPreview()
      .contains(`${DynamicPageText} - undefined - undefined`)
      .should('exist')
  })

  it('should create a text element in the test-page', () => {
    // go to the regular page
    cy.visit(
      `/apps/cypress/codelab-app/pages/test-page/builder?primarySidebarKey=explorer`,
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.waitForSpinners()

    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    cy.getCuiSidebar('Explorer')
      .getCuiToolbarItem('Add Element')
      .first()
      .click()

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Atom',
      type: FIELD_TYPE.SELECT,
      value: IAtomType.AntDesignTypographyText,
    })
    // need to wait for the code to put the autocomputed name before typing
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: 'Typography Element',
    })

    cy.getCuiPopover('Create Element').getCuiToolbarItem('Create').click()

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    // editorjs fails internally without this, maybe some kind of initialization - Cannot read properties of undefined (reading 'contains')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)

    cy.getCuiTreeItemByPrimaryTitle('Typography Element').click({
      force: true,
    })

    cy.typeIntoTextEditor(TestPageText)

    cy.get('#render-root').contains(TestPageText).should('exist')
  })

  it('should create a NextLink in the test-page to go to the dynamic page', () => {
    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    cy.getCuiSidebar('Explorer')
      .getCuiToolbarItem('Add Element')
      .first()
      .click()

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Atom',
      type: FIELD_TYPE.SELECT,
      value: IAtomType.NextLink,
    })
    // need to wait for the code to put the autocomputed name before typing
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: 'Next Link Element',
    })

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Props Data',
      type: FIELD_TYPE.INPUT,
      value: `{ "href": "/tests/${dynamicUrlSegment1}/subtests/${dynamicUrlSegment2}", "customText": "${GoToDynamicPageText}" }`,
    })

    // Create an alias of the new element id to later be used for
    // getting its corresponding text editor
    cy.createElementAndStoreId()

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    cy.get('#render-root').contains(GoToDynamicPageText).should('exist')
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

    cy.getCuiSidebar('Explorer')
      .getCuiToolbarItem('Add Element')
      .first()
      .click()

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Atom',
      type: FIELD_TYPE.SELECT,
      value: IAtomType.NextLink,
    })
    // need to wait for the code to put the autocomputed name before typing
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)

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

    cy.createElementAndStoreId()

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    // editorjs fails internally without this, maybe some kind of initialization - Cannot read properties of undefined (reading 'contains')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)

    cy.getCuiTreeItemByPrimaryTitle('Next Link Element').click({ force: true })

    cy.getNewElementId().then((nextLinkId) => {
      // Prevent default to be able to type into the text editor
      cy.preventDefaultOnClick(`[data-element-id="${nextLinkId}"]`)
      cy.typeIntoTextEditor(GoToTestPageText, nextLinkId)
      // Remove the prevent default so the link works for the next tests
      cy.removePreventDefaultOnClick(`[data-element-id="${nextLinkId}"]`)
    })

    cy.waitForApiCalls()

    cy.openPreview().contains(GoToTestPageText).should('exist')
  })

  // Skip this for now until we re-worked the routing within the builder preview
  it.skip('should navigate to /test-page of the app within the builder when NextLink in the provider is clicked', () => {
    cy.get('#render-root').contains(GoToTestPageText).click()
    cy.contains(TestPageText).should('exist')
  })

  // Skip this for now until we re-worked the routing within the builder preview
  it.skip('should navigate to the dynamic page within the builder when NextLink in the /test-page is clicked', () => {
    cy.get('#render-root').contains(GoToDynamicPageText).click()
    cy.findByText(
      `${DynamicPageText} - ${dynamicUrlSegment1} - ${dynamicUrlSegment2}`,
    ).should('exist')
  })
})
