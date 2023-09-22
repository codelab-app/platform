import {
  HttpMethod,
  HttpResponseType,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import {
  ActionKind,
  ResourceType,
  TypeKind,
} from '@codelab/shared/abstract/codegen'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { FIELD_TYPE } from '@codelab/testing/cypress/antd'
import { loginAndSetupData } from '@codelab/testing/cypress/nextjs-auth0'

describe('Running nested API and code actions', () => {
  let app: IAppDTO
  let apiPostActionId: string
  // TODO: this should be temporary, while we are not seeding the atom fields yet in the e2e tests
  // because the workaround for now is to manually set props in the create form for the element
  const actionTypeId = '90b255f4-6ba9-4e2c-a44b-af43ff0b9a7f'
  const resourceName = 'Fetch Data'
  const resourceUrl = 'http://some-api.com/api'
  const urlGetSegment = '/data/some-id'
  const urlPostSegment = '/data'
  const stateKey = 'localData'
  const apiGetActionName = 'On Fetch Data'
  const apiPostActionName = 'On Update Data'
  const codeActionName = 'Store Data'
  const mockGetResponse = 'the updated response'

  before(() => {
    loginAndSetupData()
    cy.request('/api/data/type/seed-cypress-type')

    cy.request('/api/data/atom/seed-cypress-atom')
      .then(() => cy.request<IAppDTO>('/api/data/app/seed-cypress-app'))
      .then((apps) => {
        app = apps.body
      })
  })

  it('should create the resouce that will be used for the api actions', () => {
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

    cy.getCuiPopover('Create Resource').within(() => {
      cy.getCuiToolbarItem('Create').click()
    })

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
      cy.getCuiToolbarItem('Create').click()
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

    cy.intercept('POST', `api/graphql`).as('createAction')
    cy.getCuiPopover('Create Action').within(() => {
      cy.getCuiToolbarItem('Create').click()
    })
    cy.wait('@createAction')
  })

  it('should create a GET api action and set code action as success action', () => {
    cy.getHeaderToolbarItem('Add Action').click()

    cy.setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: apiGetActionName,
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

    cy.intercept('POST', `api/graphql`).as('createAction')
    cy.getCuiPopover('Create Action').within(() => {
      cy.getCuiToolbarItem('Create').click()
    })
    cy.wait('@createAction')
  })

  it('should create a POST api action and set the GET api action as success action', () => {
    cy.getHeaderToolbarItem('Add Action').click()

    cy.setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: apiPostActionName,
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
      value: apiGetActionName,
    })

    cy.setFormFieldValue({
      label: 'Url segment',
      type: FIELD_TYPE.INPUT,
      value: urlPostSegment,
    })

    cy.setFormFieldValue({
      label: 'Response type',
      type: FIELD_TYPE.SELECT,
      value: HttpResponseType.Json,
    })

    cy.setFormFieldValue({
      label: 'Method',
      type: FIELD_TYPE.SELECT,
      value: HttpMethod.POST,
    })

    cy.intercept('POST', `api/graphql`).as('createAction')
    cy.getCuiPopover('Create Action').within(() => {
      cy.getCuiToolbarItem('Create').click()
    })

    cy.wait('@createAction').then(({ response }) => {
      apiPostActionId = response?.body.data.createApiActions.apiActions[0]
        .id as string
    })
  })

  it('should create a button element and set the POST api action as the click handler', () => {
    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    cy.getCuiSidebar('Explorer')
      .getCuiToolbarItem('Add Element')
      .first()
      .click()

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

    // need to wait for the code to put the autocomputed name before typing
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: 'Typography Element',
    })

    cy.getCuiPopover('Create Element').within(() => {
      cy.getCuiToolbarItem('Create').click()
    })

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    // editorjs fails internally without this, maybe some kind of initialisation - Cannot read properties of undefined (reading 'contains')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)

    cy.getCuiTreeItemByPrimaryTitle('Typography Element').click({
      force: true,
    })

    // set text prop to use the state
    cy.typeIntoTextEditor('response from api - {{state.localData}}')

    cy.openPreview()
    cy.get('#render-root').contains(`response from api - null`).should('exist')
    cy.openBuilder()

    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })
    cy.getCuiSidebar('Explorer')
      .getCuiToolbarItem('Add Element')
      .first()
      .click()

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Render Type',
      type: FIELD_TYPE.SELECT,
      value: 'Atom',
    })
    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Atom',
      type: FIELD_TYPE.SELECT,
      value: IAtomType.AntDesignButton,
    })

    // TODO: once we seed the atom fields, change this logic so that you select the action in
    // in the "On Click" field
    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Props Data',
      type: FIELD_TYPE.INPUT,
      value: `{ "customText": "Click button to post", "onClick": { "kind": "${TypeKind.ActionType}", "value": "${apiPostActionId}", "type": "${actionTypeId}" } }`,
    })

    // need to wait for the code to put the autocomputed name before typing
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: 'Post Button',
    })

    cy.getCuiPopover('Create Element').within(() => {
      cy.getCuiToolbarItem('Create').click()
    })

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    // editorjs fails internally without this, maybe some kind of initialisation - Cannot read properties of undefined (reading 'contains')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)

    cy.getCuiTreeItemByPrimaryTitle('Post Button').click({ force: true })

    cy.get('#render-root').contains('Click button to post').should('exist')
  })

  it('should run the POST api, GET api, and code action in order when the button is clicked', () => {
    cy.intercept('POST', `${resourceUrl}${urlPostSegment}`, {
      statusCode: 200,
    }).as('updateData')
    cy.intercept('GET', `${resourceUrl}${urlGetSegment}`, mockGetResponse).as(
      'getData',
    )

    cy.get('#render-root')
      .findByText('Click button to post')
      .click({ force: true })

    cy.wait('@updateData')
    cy.wait('@getData')

    cy.openPreview()
    cy.get('#render-root')
      .contains(`response from api - ${mockGetResponse}`)
      .should('exist')
  })
})
