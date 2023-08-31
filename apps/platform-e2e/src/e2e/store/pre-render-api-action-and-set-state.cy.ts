import {
  HttpResponseType,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { ActionKind, ResourceType } from '@codelab/shared/abstract/codegen'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { FIELD_TYPE } from '../../support/antd/form'
import { loginSession } from '../../support/nextjs-auth0/commands/login'

describe('Running API action and setting state on element pre-render', () => {
  let app: IAppDTO
  const resourceName = 'Fetch Data'
  const resourceUrl = 'http://some-api.com/api'
  const urlGetSegment = '/data/some-id'
  const stateKey = 'localData'
  const apiActionName = 'On Fetch Data'
  const codeActionName = 'Store Data'
  const mockResponse = 'text response from api'
  before(() => {
    cy.resetDatabase()
    loginSession()
    cy.visit('/resources')
    cy.getSpinner().should('not.exist')

    // Create the API resource we will use for the API action
    cy.getCuiSidebar('Resources').getToolbarItem('Add a Resource').click()

    cy.setFormFieldValue({ label: 'Name', value: resourceName })
    cy.setFormFieldValue({ label: 'Url', value: resourceUrl })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: ResourceType.Rest,
    })

    cy.getCuiPopover('Create Resource').within(() => {
      cy.getToolbarItem('Create').click()
    })

    cy.getCuiTreeItemByPrimaryTitle(resourceName).should('exist')

    cy.request('/api/cypress/type')

    cy.request('/api/cypress/atom')
      .then(() => cy.request<IAppDTO>('/api/cypress/app'))
      .then((apps) => {
        app = apps.body
        cy.visit(
          `/apps/cypress/${slugify(app.name)}/pages/${slugify(
            IPageKindName.Provider,
          )}/builder`,
        )
        cy.getSpinner().should('not.exist')

        // select root now so we can update its child later
        // there is an issue with tree interaction
        // Increased timeout since builder may take longer to load
        cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
          .should('be.visible')
          .click({ force: true })
      })
  })

  it('should create a state', () => {
    cy.getCuiSidebarViewHeader('State').click()
    cy.getHeaderToolbarItem('Add Field').click()

    cy.setFormFieldValue({
      label: 'Key',
      type: FIELD_TYPE.INPUT,
      value: stateKey,
    })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: 'String',
    })

    cy.findByText('Default values').should('exist')

    cy.setFormFieldValue({
      label: 'Nullable',
      type: FIELD_TYPE.TOGGLE,
      value: true,
    })

    cy.getCuiPopover('Create Field').within(() => {
      cy.getToolbarItem('Create').click()
    })
  })

  it('should create a code action', () => {
    cy.getCuiSidebarViewHeader('Actions').click()
    cy.getHeaderToolbarItem('Add Action').click()

    cy.setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: codeActionName,
    })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: ActionKind.CodeAction,
    })

    cy.setFormFieldValue({
      label: 'Action code',
      type: FIELD_TYPE.CODE_MIRROR,
      value: 'function run(response) { state.localData = response.data; }',
    })

    cy.getCuiPopover('Create Action').within(() => {
      cy.getToolbarItem('Create').click()
    })
  })

  it('should create an api action and set code action as success action', () => {
    cy.getHeaderToolbarItem('Add Action').click()

    cy.setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: apiActionName,
    })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: ActionKind.ApiAction,
    })

    cy.setFormFieldValue({
      label: 'Resource',
      type: FIELD_TYPE.SELECT,
      value: resourceName,
    })

    cy.setFormFieldValue({
      label: 'Success Action',
      type: FIELD_TYPE.SELECT,
      value: codeActionName,
    })

    cy.setFormFieldValue({
      label: 'Url segment',
      type: FIELD_TYPE.INPUT,
      value: urlGetSegment,
    })

    cy.setFormFieldValue({
      label: 'Response type',
      type: FIELD_TYPE.SELECT,
      value: HttpResponseType.Text,
    })

    cy.getCuiPopover('Create Action').within(() => {
      cy.getToolbarItem('Create').click()
    })
  })

  it('should create an element and set api action as pre-render action', () => {
    cy.intercept(`${resourceUrl}${urlGetSegment}`, mockResponse)
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

    cy.getCuiPopover('Create Element').within(() => {
      cy.getToolbarItem('Create').click()
    })

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    cy.getCuiTreeItemByPrimaryTitle('Typography Element').click({ force: true })

    cy.get('.codex-editor .ce-block__content .cdx-block').type(
      `response from api - {{state.localData}}`,
      {
        parseSpecialCharSequences: false,
      },
    )

    cy.get('#render-root')
      .findByText(`response from api - null`)
      .should('exist')

    // set pre-render action
    cy.get(`.ant-tabs [aria-label="node-index"]`).click()
    cy.contains('.ant-collapse-header-text', 'Hooks Actions').click()
    cy.get('.ant-tabs-tabpane-active form').setFormFieldValue({
      label: 'Pre render action',
      type: FIELD_TYPE.SELECT,
      value: apiActionName,
    })

    // it executes after setting the pre-render action
    // this makes sure that the form got saved
    cy.get('#render-root')
      .findByText(`response from api - ${mockResponse}`)
      .should('exist')
  })

  it('should run the api action in the pre-render upon reload of the page', () => {
    cy.intercept(`${resourceUrl}${urlGetSegment}`, mockResponse)
    cy.reload()

    cy.get('#render-root')
      .findByText(`response from api - ${mockResponse}`)
      .should('exist')
  })
})
