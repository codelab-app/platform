import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type {
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

const ELEMENT_FORM = 'Element Form'
const ELEMENT_FORM_ITEM_INPUT = 'Element Form Item Input'
const ELEMENT_INPUT_NAME = 'inputField'
const ELEMENT_INPUT = 'Element Input'
const ELEMENT_FORM_ITEM_SELECT = 'Element Form Item Select'
const ELEMENT_SELECT_NAME = 'selectField'
const ELEMENT_SELECT = 'Element Select'
const ELEMENT_FORM_ITEM_CHECKBOX = 'Element Form Item Checkbox'
const ELEMENT_CHECKBOX_NAME = 'checkboxField'
const ELEMENT_CHECKBOX = 'Element Checkbox'
const ELEMENT_FORM_ITEM_BUTTON = 'Element Form Item Button'
const ELEMENT_BUTTON_TITLE = 'Submit Form'
const ELEMENT_BUTTON = 'Element Button'

const elements: Array<ICreateElementData> = [
  {
    atom: IAtomType.AntDesignFormItem,
    name: ELEMENT_FORM_ITEM_INPUT,
    parentElement: ELEMENT_FORM,
    propsData: {
      label: 'Input Field',
      name: ELEMENT_INPUT_NAME,
    },
  },
  {
    atom: IAtomType.AntDesignInput,
    name: ELEMENT_INPUT,
    parentElement: ELEMENT_FORM_ITEM_INPUT,
  },
  {
    atom: IAtomType.AntDesignFormItem,
    name: ELEMENT_FORM_ITEM_SELECT,
    parentElement: ELEMENT_FORM,
    propsData: {
      label: 'Select Field',
      name: ELEMENT_SELECT_NAME,
    },
  },
  {
    atom: IAtomType.AntDesignSelect,
    name: ELEMENT_SELECT,
    parentElement: ELEMENT_FORM_ITEM_SELECT,
    propsData: {
      options: [
        {
          label: 'Select Option A',
          value: 'selectOptionA',
        },
        {
          label: 'Select Option B',
          value: 'selectOptionB',
        },
      ],
    },
  },
  {
    atom: IAtomType.AntDesignFormItem,
    name: ELEMENT_FORM_ITEM_CHECKBOX,
    parentElement: ELEMENT_FORM,
    propsData: {
      name: ELEMENT_CHECKBOX_NAME,
      valuePropName: 'checked',
    },
  },
  {
    atom: IAtomType.AntDesignCheckbox,
    name: ELEMENT_CHECKBOX,
    parentElement: ELEMENT_FORM_ITEM_CHECKBOX,
    propsData: {
      customText: '<p>Checkbox Field</p>',
    },
  },
  {
    atom: IAtomType.AntDesignFormItem,
    name: ELEMENT_FORM_ITEM_BUTTON,
    parentElement: ELEMENT_FORM,
  },
  {
    atom: IAtomType.AntDesignButton,
    name: ELEMENT_BUTTON,
    parentElement: ELEMENT_FORM_ITEM_BUTTON,
    propsData: {
      customText: `<p>${ELEMENT_BUTTON_TITLE}</p>`,
      htmlType: 'submit',
    },
  },
]

describe('Testing the Form atom', () => {
  let app: IAppDto
  let page: IPageDto
  let apiPostActionId: string
  // TODO: this should be temporary, while we are not seeding the atom fields yet in the e2e tests
  // because the workaround for now is to manually set props in the create form for the element
  const actionTypeId = '90b255f4-6ba9-4e2c-a44b-af43ff0b9a7f'
  const apiPostActionName = 'On Submit'
  const resourceName = 'Api Resource'
  const resourceUrl = 'http://some-api.com/api'
  const urlPostSegment = '/data'

  before(() => {
    cy.postApiRequest<IAppDto>('/app/seed-cypress-app').then((apps) => {
      app = apps.body
      page = findOrFail(app.pages, (_page) => _page.kind === IPageKind.Provider)

      cy.wrap(page).should('have.property', 'store')

      const createResourceData: ICreateResourceData = {
        config: { url: resourceUrl },
        id: v4(),
        name: resourceName,
        type: IResourceType.Rest,
      }

      const createActionData: ICreateApiActionData = {
        config: {
          data: {
            body: "{{JSON.stringify(refs['element-form'].current.getFieldsValue())}}",
            method: HttpMethod.POST,
            responseType: HttpResponseType.Text,
            urlSegment: urlPostSegment,
          },
          id: v4(),
        },
        id: v4(),
        name: apiPostActionName,
        resource: { id: createResourceData.id },
        storeId: page.store.id,
        type: IActionKind.ApiAction,
      }

      apiPostActionId = createActionData.id

      /**
       * Condensed `it` step to post request
       */
      cy.postApiRequest('/resource/create-resource', createResourceData)
      cy.postApiRequest('/action/create-action', createActionData)
    })
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

    const elementForm = {
      atom: IAtomType.AntDesignForm,
      name: ELEMENT_FORM,
      parentElement: ROOT_ELEMENT_NAME,
      propsData: {
        customText: `<p>${ELEMENT_BUTTON_TITLE}</p>`,
        htmlType: 'submit',
        onFinish: {
          kind: ITypeKind.ActionType,
          type: actionTypeId,
          value: apiPostActionId,
        },
      },
    }

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
