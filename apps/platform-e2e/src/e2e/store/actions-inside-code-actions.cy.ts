import {
  CUSTOM_TEXT_PROP_KEY,
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
import { loginSession } from '@codelab/testing/cypress/nextjs-auth0'

describe('Running actions inside code action with arguments', () => {
  let app: IAppDTO
  let codeActionId: string
  // TODO: this should be temporary, while we are not seeding the atom fields yet in the e2e tests
  // because the workaround for now is to manually set props in the create form for the element
  const actionTypeId = '90b255f4-6ba9-4e2c-a44b-af43ff0b9a7f'
  const resourceName = 'Fetch Data'
  const resourceUrl = 'http://some-api.com/api'
  const urlSegment = '/data/some-id'
  const apiActionName = 'apiAction'
  const codeActionName1 = 'codeAction1'
  const codeActionName2 = 'codeAction2'
  const stateKey1 = 'stateKey1'
  const stateKey2 = 'stateKey2'

  before(() => {
    loginSession()
    cy.resetDatabaseExceptForUserAndAtom()
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

  it('should create states', () => {
    cy.getCuiSidebarViewHeader('State').click()
    cy.getHeaderToolbarItem('Add Field').click()

    cy.setFormFieldValue({
      label: 'Key',
      type: FIELD_TYPE.INPUT,
      value: stateKey1,
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

    cy.getHeaderToolbarItem('Add Field').click()

    cy.setFormFieldValue({
      label: 'Key',
      type: FIELD_TYPE.INPUT,
      value: stateKey2,
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

  it('should create two code action and one api action', () => {
    cy.getCuiSidebarViewHeader('Actions').click()

    // API action
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
      label: 'Url segment',
      type: FIELD_TYPE.INPUT,
      value: urlSegment,
    })

    cy.setFormFieldValue({
      label: 'Response type',
      type: FIELD_TYPE.SELECT,
      value: HttpResponseType.Text,
    })

    cy.setFormFieldValue({
      label: 'Method',
      type: FIELD_TYPE.SELECT,
      value: HttpMethod.POST,
    })

    cy.setFormFieldValue({
      label: 'Body',
      type: FIELD_TYPE.CODE_MIRROR,
      value: '{"firstArg": "{{args[0]}}", "secondArg": {{args[1]}}}',
    })

    cy.getCuiPopover('Create Action').within(() => {
      cy.getToolbarItem('Create').click()
    })

    // first code action
    cy.getHeaderToolbarItem('Add Action').click()

    cy.setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: codeActionName1,
    })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: ActionKind.CodeAction,
    })

    cy.setFormFieldValue({
      label: 'Action code',
      type: FIELD_TYPE.CODE_MIRROR,
      value: `function run(firstArg, secondArg) { state['${stateKey1}'] = firstArg; state['${stateKey2}'] = secondArg; }`,
    })

    cy.getCuiPopover('Create Action').within(() => {
      cy.getToolbarItem('Create').click()
    })

    // second code action
    cy.getHeaderToolbarItem('Add Action').click()

    cy.getCuiSidebarViewContent('Actions')
      .get('input[name="id"]')
      .invoke('val')
      .then((id) => {
        codeActionId = id as string
      })

    cy.setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: codeActionName2,
    })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: ActionKind.CodeAction,
    })

    cy.setFormFieldValue({
      label: 'Action code',
      type: FIELD_TYPE.CODE_MIRROR,
      value: `function run() { actions['${codeActionName1}']('hey', 123); actions['${apiActionName}']('yo', 456); }`,
    })

    cy.getCuiPopover('Create Action').within(() => {
      cy.getToolbarItem('Create').click()
    })
  })

  it('should create a button element and set the code action as the click handler', () => {
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
      label: 'Props Data',
      type: FIELD_TYPE.INPUT,
      value: `{ "${CUSTOM_TEXT_PROP_KEY}": "${stateKey1} - {{state['${stateKey1}']}}, ${stateKey2} - {{state['${stateKey2}']}}" }`,
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

    cy.get('#render-root')
      .findByText(
        `${stateKey1} - {{state['${stateKey1}']}}, ${stateKey2} - {{state['${stateKey2}']}}`,
      )
      .should('exist')

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
      value: IAtomType.AntDesignButton,
    })

    // TODO: once we seed the atom fields, change this logic so that you select the action in
    // in the "On Click" field
    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Props Data',
      type: FIELD_TYPE.INPUT,
      value: `{ "${CUSTOM_TEXT_PROP_KEY}": "Click button to run actions", "onClick": { "kind": "${TypeKind.ActionType}", "value": "${codeActionId}", "type": "${actionTypeId}" } }`,
    })

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: 'Action Button',
    })

    cy.getCuiPopover('Create Element').within(() => {
      cy.getToolbarItem('Create').click()
    })

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    cy.get('#render-root')
      .findByText('Click button to run actions')
      .should('exist')
  })

  it('should run the code action that calls another call action and an API action with arguments when the button is clicked', () => {
    cy.intercept('POST', `${resourceUrl}${urlSegment}`, {
      statusCode: 200,
    }).as('apiAction')

    cy.get('#render-root')
      .findByText('Click button to run actions')
      .click({ force: true })

    cy.wait('@apiAction')
    cy.get('@apiAction').should(({ request }: any) => {
      expect(request.body).toMatchObject({
        firstArg: 'yo',
        secondArg: 456,
      })
    })

    cy.openPreview()
    cy.get('#render-root').contains(`${stateKey1} - hey, ${stateKey2} - 123`)
  })
})
