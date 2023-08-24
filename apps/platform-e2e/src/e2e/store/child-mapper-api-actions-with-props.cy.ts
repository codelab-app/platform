import {
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

describe('Element Child Mapper', () => {
  let app: IAppDTO
  let apiGetActionId: string
  // TODO: this should be temporary, while we are not seeding the atom fields yet in the e2e tests
  // because the workaround for now is to manually set props in the create form for the element
  const actionTypeId = '90b255f4-6ba9-4e2c-a44b-af43ff0b9a7f'
  const resourceName = 'Fetch Data'
  const resourceUrl = 'http://some-api.com/api'
  const urlGetSegment = '/data/{{componentProps.id}}'
  const apiGetActionName = 'On Fetch Data'
  const mockGetResponse = 'the response'
  const COMPONENT_NAME = 'Button Component'
  const ELEMENT_BUTTON = 'Element Button'
  const ELEMENT_ROW = 'Element Row'

  const childMapperData = [
    {
      id: 'data-id-1',
      name: 'Data Name 1',
    },
    {
      id: 'data-id-2',
      name: 'Data Name 2',
    },
    {
      id: 'data-id-3',
      name: 'Data Name 3',
    },
  ]

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
      })
  })

  it('should create a component and api action', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder?primarySidebarKey=components`,
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.getSpinner().should('not.exist')

    // GetAtoms
    // GetComponents
    cy.waitForApiCalls()
    cy.getSpinner().should('not.exist')

    cy.getCuiSidebar('Components')
      .getToolbarItem('Add Component')
      .first()
      .click()
    cy.findByTestId('create-component-form')
      .findByLabelText('Name')
      .type(COMPONENT_NAME)

    cy.getCuiPopover('Create Component').within(() => {
      cy.getToolbarItem('Create').click()
    })

    cy.findByTestId('create-component-form').should('not.exist', {
      timeout: 10000,
    })
    cy.findByText(COMPONENT_NAME).should('exist')

    cy.getSider().getButton({ icon: 'edit' }).click()

    cy.findByText('Elements Tree').should('exist')
    cy.getSpinner().should('not.exist')

    cy.getCuiSidebarViewHeader('Actions').click()
    cy.getHeaderToolbarItem('Add Action').click()

    cy.get('input[name="id"]')
      .invoke('val')
      .then((id) => {
        apiGetActionId = id as string
      })

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

  it('should add button to the component and set the api action on the onClick', () => {
    cy.getCuiTreeItemByPrimaryTitle(`${COMPONENT_NAME} Root`).click()
    cy.getCuiTreeItemByPrimaryTitle(`${COMPONENT_NAME} Root`).within(() => {
      cy.getToolbarItem('Add Child').click()
    })

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
      value: `{ "onClick": { "kind": "${TypeKind.ActionType}", "value": "${apiGetActionId}", "type": "${actionTypeId}" } }`,
    })
    cy.findByTestId('create-element-form').setFormFieldValue({
      label: 'Name',
      type: FIELD_TYPE.INPUT,
      value: ELEMENT_BUTTON,
    })

    cy.getCuiPopover('Create Element').within(() => {
      cy.getToolbarItem('Create').click()
    })

    cy.waitForApiCalls()

    cy.findByTestId('create-element-form').should('not.exist', {
      timeout: 10000,
    })

    cy.typeIntoTextEditor('Name of data - {{ componentProps.name }}')

    cy.openPreview()
    cy.get('#render-root').contains('Name of data - undefined').should('exist')
  })

  it('should create an element with child mapper data', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder?primarySidebarKey=explorer`,
    )
    cy.getSpinner().should('not.exist')

    // select root now so we can update its child later
    // there is an issue with tree interaction
    // Increased timeout since builder may take longer to load
    cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
      .should('be.visible')
      .click({ force: true })

    cy.createElementTree([
      {
        name: ELEMENT_ROW,
        parentElement: ROOT_ELEMENT_NAME,
      },
    ])
    cy.getCuiTreeItemByPrimaryTitle(ELEMENT_ROW).click({ force: true })
    // set pre-render action
    cy.get(`.ant-tabs [aria-label="node-index"]`).click()
    cy.contains('.ant-collapse-header-text', 'Child Mapper').click()
    cy.get('.ant-collapse').findByRole('button', { name: 'JS' }).click()
    cy.get('.ant-collapse').setFormFieldValue({
      type: FIELD_TYPE.CODE_MIRROR,
      value: `{{${JSON.stringify(childMapperData)}}}`,
    })
    cy.get('.ant-collapse').setFormFieldValue({
      label: 'Component',
      type: FIELD_TYPE.SELECT,
      value: COMPONENT_NAME,
    })
  })

  it('should render the component instances with props values from array', () => {
    cy.waitForApiCalls()

    cy.openPreview()
    childMapperData.forEach((data) => {
      cy.get('#render-root')
        .contains(`Name of data - ${data.name}`)
        .should('exist')
    })
  })

  it('should call the api action with the componentProps.id of each child mapper instances when the button is clicked', () => {
    for (const data of childMapperData) {
      cy.intercept('GET', `${resourceUrl}/data/${data.id}`, mockGetResponse).as(
        `getData-${data.id}`,
      )

      cy.get('#render-root')
        .contains(`Name of data - ${data.name}`)
        .click({ force: true })

      cy.wait(`@getData-${data.id}`)
    }
  })
})
