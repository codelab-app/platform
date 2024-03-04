import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type {
  IApiActionDto,
  IAppDto,
  ICreateActionData,
  ICreateApiActionData,
  ICreateElementData,
  ICreateResourceData,
  IPageDto,
} from '@codelab/shared/abstract/core'
import {
  HttpMethod,
  HttpResponseType,
  IActionKind,
  IActionType,
  IAtomType,
  IPageKind,
  IPageKindName,
  IResourceType,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { findOrFail, slugify } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import {
  ELEMENT_CHECKBOX_NAME,
  ELEMENT_INPUT_NAME,
  ELEMENT_SELECT_NAME,
  elementForm,
} from './elements.data'
import {
  actionTypeId,
  apiPostActionId,
  createApiPostActionData,
  createResourceData,
  resourceUrl,
} from './resource.data.ts'

describe('Testing the Form atom', () => {
  let app: IAppDto
  let page: IPageDto

  before(() => {
    cy.postApiRequest<IAppDto>('/app/seed-cypress-app').as('cypressApp')

    cy.wait('@cypressApp').then(({ response }) => {
      app = response?.body
      page = findOrFail(app.pages, (_page) => _page.kind === IPageKind.Provider)

      cy.wrap(page).should('have.property', 'store')

      return app
    })

    cy.wait('@cypressApp')
      .then(() =>
        cy.postApiRequest('/resource/create-resource', createResourceData),
      )
      .as('cypressResource')

    cy.wait('@cypressResource').then(() =>
      cy.postApiRequest('/action/create-action', createApiPostActionData(page)),
    )
  })

  // it('should create the resource that will be used upon submission of the form', () => {
  //   cy.visit('/resources')
  //   cy.getSpinner().should('not.exist')

  //   // Create the API resource we will use for the API action
  //   cy.getCuiSidebar('Resources').getCuiToolbarItem('Add a Resource').click()

  //   cy.setFormFieldValue({ label: 'Name', value: resourceName })
  //   cy.setFormFieldValue({ label: 'Url', value: resourceUrl })
  //   cy.setFormFieldValue({
  //     label: 'Type',
  //     type: FIELD_TYPE.SELECT,
  //     value: IResourceType.Rest,
  //   })

  //   cy.getCuiPopover('Create Resource').getCuiToolbarItem('Create').click()

  //   cy.getCuiTreeItemByPrimaryTitle(resourceName).should('exist')
  // })

  // it('should create an API action to be used upon submission of form', () => {
  //   cy.visit(
  //     `/apps/cypress/${slugify(app.name)}/pages/${slugify(
  //       IPageKindName.Provider,
  //     )}/builder`,
  //   )
  //   cy.getSpinner().should('not.exist')

  //   // select root now so we can update its child later
  //   // there is an issue with tree interaction
  //   // Increased timeout since builder may take longer to load
  //   cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
  //     .should('be.visible')
  //     .click({ force: true })
  //   cy.getCuiSidebarViewHeader('Actions').click()
  //   cy.getCuiSidebarViewHeader('Actions')
  //     .getCuiToolbarItem('Add Action')
  //     .click()

  //   cy.setFormFieldValue({
  //     label: 'Name',
  //     type: FIELD_TYPE.INPUT,
  //     value: apiPostActionName,
  //   })

  //   cy.setFormFieldValue({
  //     label: 'Type',
  //     type: FIELD_TYPE.SELECT,
  //     value: IActionKind.ApiAction,
  //   })

  //   cy.setFormFieldValue({
  //     label: 'Resource',
  //     type: FIELD_TYPE.SELECT,
  //     value: resourceName,
  //   })

  //   cy.setFormFieldValue({
  //     label: 'Url segment',
  //     type: FIELD_TYPE.INPUT,
  //     value: urlPostSegment,
  //   })

  //   cy.setFormFieldValue({
  //     label: 'Body',
  //     type: FIELD_TYPE.CODE_MIRROR,
  //     value:
  //       "{{JSON.stringify(refs['element-form'].current.getFieldsValue())}}",
  //   })

  //   cy.setFormFieldValue({
  //     label: 'Response type',
  //     type: FIELD_TYPE.SELECT,
  //     value: HttpResponseType.Text,
  //   })

  //   cy.setFormFieldValue({
  //     label: 'Method',
  //     type: FIELD_TYPE.SELECT,
  //     value: HttpMethod.POST,
  //   })

  //   cy.intercept('POST', `api/graphql`).as('createAction')
  //   cy.getCuiPopover('Create Action').getCuiToolbarItem('Create').click()

  //   cy.wait('@createAction').then(({ response }) => {
  //     apiPostActionId = response?.body.data.createApiActions.apiActions[0]
  //       .id as string
  //   })
  // })

  it('should create the form elements', () => {
    // has to be created separately because of the action

    cy.postApiRequest(`element/${page.id}/create-element`, elementForm).then(
      (result) => {
        // console.log(result)
        // cy.postApiRequest(`element/${elementForm.id}/create-element-tree`, elementForm)
      },
    )

    // cy.getMobxStore(async (store) => {
    //   for (const element of elements) {
    //     await store.elementService.createElement({
    //       ...element,
    //       closestContainerNode: {
    //         // id:
    //       },
    //       id: v4(),
    //       renderType: {
    //         __typename: 'Atom',
    //         id: '',
    //       },
    //     })
    //   }
    // })

    // cy.createElementTree([
    //   {
    //     atom: IAtomType.AntDesignForm,
    //     name: ELEMENT_FORM,
    //     parentElement: ROOT_ELEMENT_NAME,
    //     propsData: {
    //       customText: `<p>${ELEMENT_BUTTON_TITLE}</p>`,
    //       htmlType: 'submit',
    //       onFinish: {
    //         kind: TypeKind.ActionType,
    //         type: actionTypeId,
    //         value: apiPostActionId,
    //       },
    //     },
    //   },
    // ])

    // cy.createElementTree(elements)
  })

  it('should populate the form fields - input, select, and checkbox', () => {
    cy.openPreview()

    cy.get(`#render-root #${ELEMENT_INPUT_NAME}`).type('testing')
    cy.get(`#render-root #${ELEMENT_SELECT_NAME}`).click()
    cy.findByText('Select Option B').click()
    cy.get(`#render-root #${ELEMENT_CHECKBOX_NAME}`).check()
  })

  it('should send the form data as request body in the API action', () => {
    cy.intercept('POST', `${resourceUrl}/data`, { statusCode: 200 }).as(
      'submitData',
    )

    cy.get('#render-root button').first().click({ force: true })

    cy.wait('@submitData').its('request.body').should('deep.equal', {
      checkboxField: true,
      inputField: 'testing',
      selectField: 'selectOptionB',
    })
  })
})
