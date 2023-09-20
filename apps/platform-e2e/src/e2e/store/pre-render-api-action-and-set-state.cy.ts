import { HttpResponseType } from '@codelab/frontend/abstract/domain'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import { loginAndSetupData } from '@codelab/frontend/test/cypress/nextjs-auth0'
import { ActionKind, ResourceType } from '@codelab/shared/abstract/codegen'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { slugify } from '@codelab/shared/utils'
import { FIELD_TYPE } from '@codelab/testing/cypress/antd'
import { loginSession } from '@codelab/testing/cypress/nextjs-auth0'

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
    loginSession()
    cy.resetDatabaseExceptForUserAndAtom()

    cy.visit('/resources')
    cy.getSpinner().should('not.exist')

    // Create the API resource we will use for the API action
    cy.getCuiSidebar('Resources').getCuiToolbarItem('Add a Resource').click()

    cy.setFormFieldValue({ label: 'Name', value: resourceName })
    cy.setFormFieldValue({ label: 'Url', value: resourceUrl })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: ResourceType.Rest,
    })

    cy.getCuiPopover('Create Resource').getCuiToolbarItem('Create').click()

    cy.getCuiTreeItemByPrimaryTitle(resourceName).should('exist')
  })

  it('should create a state', () => {
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

    cy.getCuiSidebarViewHeader('State').click()
    cy.getCuiSidebarViewHeader('State').getCuiToolbarItem('Add Field').click()

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

    cy.getCuiPopover('Create Field').getCuiToolbarItem('Create').click()
  })

  it('should create a code action', () => {
    cy.getCuiSidebarViewHeader('Actions').click()
    cy.getCuiSidebarViewHeader('Actions')
      .getCuiToolbarItem('Add Action')
      .click()

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

    cy.intercept('POST', `api/graphql`).as('createAction1')
    cy.getCuiPopover('Create Action').getCuiToolbarItem('Create').click()
    cy.wait('@createAction1')
  })

  it('should create an api action and set code action as success action', () => {
    cy.getCuiSidebarViewHeader('Actions')
      .getCuiToolbarItem('Add Action')
      .click()

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

    cy.intercept('POST', `api/graphql`).as('createAction2')
    cy.getCuiPopover('Create Action').getCuiToolbarItem('Create').click()
    cy.wait('@createAction2')
  })

  it('should create an element and set api action as pre-render action', () => {
    cy.intercept(`${resourceUrl}${urlGetSegment}`, mockResponse)
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

    // editorjs fails internally without this, maybe some kind of initialisation - Cannot read properties of undefined (reading 'contains')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)

    cy.getCuiTreeItemByPrimaryTitle('Typography Element').click({
      force: true,
    })

    cy.typeIntoTextEditor(`response from api - {{state.localData}}`)

    cy.waitForApiCalls()

    cy.openPreview()
    cy.get('#render-root')
      .contains(`response from api - undefined`)
      .should('exist')
    cy.openBuilder()

    // set pre-render action
    cy.get(`.ant-tabs [aria-label="node-index"]`).click()
    cy.contains('.ant-collapse-header-text', 'Hooks Actions').click()
    cy.intercept('POST', `api/graphql`).as('setPrerenderAction')
    cy.get('.ant-tabs-tabpane-active form').setFormFieldValue({
      label: 'Pre render action',
      type: FIELD_TYPE.SELECT,
      value: apiActionName,
    })
    cy.wait('@setPrerenderAction')

    cy.openPreview()
  })

  it('should run the api action in the pre-render upon reload of the page', () => {
    cy.intercept(`${resourceUrl}${urlGetSegment}`, mockResponse).as(
      'preRenderAction',
    )
    cy.reload()

    cy.wait('@preRenderAction')
    cy.get('#render-root')
      .contains(`response from api - ${mockResponse}`)
      .should('exist')
  })
})
