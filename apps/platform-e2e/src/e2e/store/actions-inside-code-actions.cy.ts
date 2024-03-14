import type { App } from '@codelab/backend/abstract/codegen'
import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { Resource } from '@codelab/shared/abstract/codegen'
import type { IAppDto } from '@codelab/shared/abstract/core'
import {
  HttpMethod,
  HttpResponseType,
  IActionKind,
  IAtomType,
  IPageKindName,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { slugify } from '@codelab/shared/utils'
import { createResourceData } from './resource.data'

describe('Running actions inside code action with arguments', () => {
  let codeActionId: string
  let app: IAppDto
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
    cy.postApiRequest<App>('/app/seed-cypress-app').then(
      ({ body }) => (app = body),
    )

    cy.postApiRequest<Resource>('/resource/create', createResourceData).then(
      ({ body }) => body,
    )
  })

  it('should create states', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    )
    cy.waitForSpinners()

    // select root now so we can update its child later
    // there is an issue with tree interaction
    // Increased timeout since builder may take longer to load
    cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
      .should('be.visible')
      .click({ force: true })

    cy.getCuiSidebarViewHeader('State').click()
    cy.getCuiSidebarViewHeader('State')
      .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
      .click()

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

    cy.getCuiPopover(MODEL_ACTION.CreateField.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
      .click()

    cy.getCuiSidebarViewHeader('State')
      .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
      .click()

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

    cy.getCuiPopover(MODEL_ACTION.CreateField.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateField.key)
      .click()
  })

  it('should create two code action and one api action', () => {
    cy.getCuiSidebarViewHeader('Actions').click()

    // API action
    cy.getCuiSidebarViewHeader('Actions')
      .getCuiToolbarItem(MODEL_ACTION.CreateAction.key)
      .click()

    cy.setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: apiActionName,
    })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: IActionKind.ApiAction,
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

    cy.intercept('POST', 'api/graphql').as('createAction1')
    cy.getCuiPopover(MODEL_ACTION.CreateAction.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateAction.key)
      .click({ force: true })
    cy.wait('@createAction1')

    // first code action
    cy.getCuiSidebarViewHeader('Actions')
      .getCuiToolbarItem(MODEL_ACTION.CreateAction.key)
      .click()

    cy.setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: codeActionName1,
    })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: IActionKind.CodeAction,
    })

    cy.setFormFieldValue({
      label: 'Action code',
      type: FIELD_TYPE.CODE_MIRROR,
      value: `function run(firstArg, secondArg) { state['${stateKey1}'] = firstArg; state['${stateKey2}'] = secondArg; }`,
    })

    cy.intercept('POST', 'api/graphql').as('createAction2')
    cy.getCuiPopover(MODEL_ACTION.CreateAction.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateAction.key)
      .click({ force: true })
    cy.wait('@createAction2')

    // second code action
    cy.getCuiSidebarViewHeader('Actions')
      .getCuiToolbarItem(MODEL_ACTION.CreateAction.key)
      .click()

    cy.setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: codeActionName2,
    })

    cy.setFormFieldValue({
      label: 'Type',
      type: FIELD_TYPE.SELECT,
      value: IActionKind.CodeAction,
    })

    cy.setFormFieldValue({
      label: 'Action code',
      type: FIELD_TYPE.CODE_MIRROR,
      value: `function run() { actions['${codeActionName1}']('hey', 123); actions['${apiActionName}']('yo', 456); }`,
    })

    cy.intercept('POST', 'api/graphql').as('createAction3')
    cy.getCuiPopover(MODEL_ACTION.CreateAction.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateAction.key)
      .click({ force: true })

    cy.wait('@createAction3').then(({ response }) => {
      codeActionId = response?.body.data.createCodeActions.codeActions[0]
        .id as string
    })
  })

  it('should create a button element and set the code action as the click handler', () => {
    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

    cy.getCuiSidebar(MODEL_UI.SidebarBuilder.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateElement.key)
      .first()
      .click()

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

    // need to wait for the code to put the auto-computed name before typing
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)

    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: 'Typography Element',
    })

    cy.getCuiPopover(MODEL_ACTION.CreateElement.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateElement.key)
      .click()

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    // editorjs fails internally without this, maybe some kind of initialization - Cannot read properties of undefined (reading 'contains')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)

    cy.get('#render-root')
      .findByText(
        `${stateKey1} - {{state['${stateKey1}']}}, ${stateKey2} - {{state['${stateKey2}']}}`,
      )
      .should('exist')

    cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })
    cy.getCuiSidebar(MODEL_UI.SidebarBuilder.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateElement.key)
      .first()
      .click()

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
      value: `{ "${CUSTOM_TEXT_PROP_KEY}": "Click button to run actions", "onClick": { "kind": "${ITypeKind.ActionType}", "value": "${codeActionId}", "type": "${actionTypeId}" } }`,
    })

    // need to wait for the code to put the auto-computed name before typing
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: 'Action Button',
    })

    cy.intercept('POST', 'api/graphql').as('createElement')
    cy.getCuiPopover(MODEL_ACTION.CreateElement.key)
      .getCuiToolbarItem(MODEL_ACTION.CreateElement.key)
      .click()
    cy.wait('@createElement')

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    // editorjs fails internally without this, maybe some kind of initialization - Cannot read properties of undefined (reading 'contains')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)
  })

  it('should run the code action that calls another call action and an API action with arguments when the button is clicked', () => {
    cy.intercept('POST', `${resourceUrl}${urlSegment}`, {
      statusCode: 200,
    }).as('apiAction')

    cy.openPreview().findByText('Click button to run actions').click()

    cy.wait('@apiAction').its('request.body').should('deep.equal', {
      firstArg: 'yo',
      secondArg: 456,
    })

    cy.get('#render-root').contains(`${stateKey1} - hey, ${stateKey2} - 123`)
  })
})
