import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import { NETWORK_IDLE_TIME } from '@codelab/frontend/test/cypress/shared'
import type { App } from '@codelab/shared/abstract/codegen'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { IAtomType, IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import {
  componentElements,
  createComponentData,
  elementSpace,
} from './component.data'

const COMPONENT_INSTANCE_NAME = 'Component Instance'
const COMPONENT_PROP_NAME = 'component_prop'
const COMPONENT_PROP_VALUE = 'component_prop_value'
const COMPONENT_CHILD_TEXT = `text {{this.${COMPONENT_PROP_NAME}}}`
const COMPONENT_INSTANCE_TEXT = 'Instance Text'
const PAGE_NAME = '_app'
let testApp: any
let app: IAppDto

describe('Component CRUD', () => {
  describe('Add component', () => {
    before(() => {
      cy.postApiRequest<App>('/app/seed-cypress-app')
        .then(({ body }) => (app = body))
        .as('cypressComponent')

      cy.get('@cypressComponent').then(() => {
        // GetRenderedPageAndCommonAppData
        cy.visit(
          `/apps/cypress/${slugify(app.name)}/pages/${slugify(
            PAGE_NAME,
          )}/builder?primarySidebarKey=components`,
        )
        cy.waitForNetworkIdle(NETWORK_IDLE_TIME)
      })
    })

    it('should be able to add a new component', () => {
      cy.waitForSpinners()

      cy.getCuiSidebar(MODEL_UI.SidebarComponent.key)
        .getCuiToolbarItem(MODEL_ACTION.CreateComponent.key)
        .click()

      cy.getCuiForm(MODEL_ACTION.CreateComponent.key)
        .findByLabelText('Name')
        .type(createComponentData.name)

      cy.getCuiPopover(MODEL_ACTION.CreateComponent.key)
        .getCuiToolbarItem(MODEL_ACTION.CreateComponent.key)
        .click()
      cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

      cy.getCuiForm(MODEL_ACTION.CreateComponent.key).should('not.exist', {
        timeout: 10000,
      })
      cy.findByText(createComponentData.name).should('exist')
    })

    it('should be able to define property on component', () => {
      cy.getSider().getButton({ icon: 'edit' }).click()

      cy.getCuiTreeItemByPrimaryTitle(
        `${createComponentData.name} Root`,
      ).should('be.visible')

      cy.waitForSpinners()

      cy.get('.ant-tabs [aria-label="setting"]').click()
      cy.get('.ant-tabs-tabpane-active').contains(/Add/).click()

      cy.getModal().setFormFieldValue({
        label: 'Key',
        value: COMPONENT_PROP_NAME,
      })

      cy.getModal().setFormFieldValue({
        label: 'Type',
        type: FIELD_TYPE.SELECT,
        value: IPrimitiveTypeKind.String,
      })

      cy.getModal().setFormFieldValue({
        label: 'Nullable',
        type: FIELD_TYPE.TOGGLE,
        value: true,
      })

      cy.getModal()
        .getModalAction(/Create/)
        .click()
      cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

      cy.getModal().should('not.exist', { timeout: 10000 })
    })

    it('should be able to add elements to the component', () => {
      cy.createElementTree(componentElements)

      cy.typeIntoTextEditor(COMPONENT_CHILD_TEXT)
      cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

      cy.openPreview().contains('text undefined').should('exist')
    })

    it('should be able to specify where to render component children', () => {
      // GetRenderedPageAndCommonAppData
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          PAGE_NAME,
        )}/builder?primarySidebarKey=components`,
      )
      cy.waitForNetworkIdle(NETWORK_IDLE_TIME)

      cy.findByText(createComponentData.name).click({ force: true })
      cy.get('.ant-tabs [aria-label="node-index"]').click()
      cy.get('.ant-tabs-tabpane-active form').setFormFieldValue({
        label: 'Container for component children',
        type: FIELD_TYPE.SELECT,
        value: elementSpace.name,
      })
    })

    it('should be able to create an instance of the component', () => {
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          PAGE_NAME,
        )}/builder?primarySidebarKey=explorer`,
      )

      cy.getCuiTreeItemByPrimaryTitle('Body').click({ force: true })

      cy.getCuiSidebar(MODEL_UI.SidebarBuilder.key)
        .getCuiToolbarItem(MODEL_ACTION.CreateElement.key)
        .click()

      cy.getCuiForm(MODEL_ACTION.CreateElement.key).setFormFieldValue({
        label: 'Render Type',
        type: FIELD_TYPE.SELECT,
        value: 'Component',
      })
      cy.getCuiForm(MODEL_ACTION.CreateElement.key).setFormFieldValue({
        label: 'Component',
        type: FIELD_TYPE.SELECT,
        value: createComponentData.name,
      })

      cy.getFormInput({ label: 'Name' }).invoke('val').should('not.be.empty')

      cy.getCuiForm(MODEL_ACTION.CreateElement.key).setFormFieldValue({
        label: 'Name',
        type: FIELD_TYPE.INPUT,
        value: COMPONENT_INSTANCE_NAME,
      })

      cy.getCuiPopover(MODEL_ACTION.CreateElement.key)
        .getCuiToolbarItem(MODEL_ACTION.CreateElement.key)
        .click()

      cy.getCuiForm(MODEL_ACTION.CreateElement.key).should('not.exist', {
        timeout: 10000,
      })
    })

    it('should be able to set props on an instance of the component', () => {
      cy.getCuiTreeItemByPrimaryTitle(COMPONENT_INSTANCE_NAME).click({
        force: true,
      })
      cy.get('.ant-tabs [aria-label="setting"]').click()
      cy.waitForSpinners()
      cy.get('.ant-tabs-tabpane-active form').setFormFieldValue({
        label: 'Component_prop',
        type: FIELD_TYPE.CODE_MIRROR,
        value: COMPONENT_PROP_VALUE,
      })
    })

    it('should be able to add children to component instance', () => {
      // Expand the children container
      cy.getCuiTreeItemByPrimaryTitle(
        `${createComponentData.name} Root`,
      ).click()

      cy.getCuiSidebar(MODEL_UI.SidebarBuilder.key)
        .getCuiToolbarItem(MODEL_ACTION.CreateElement.key)
        .click()

      cy.getCuiForm(MODEL_ACTION.CreateElement.key).setFormFieldValue({
        label: 'Atom',
        type: FIELD_TYPE.SELECT,
        value: IAtomType.AntDesignTypographyText,
      })

      cy.getFormInput({ label: 'Name' }).invoke('val').should('not.be.empty')

      cy.getCuiForm(MODEL_ACTION.CreateElement.key).setFormFieldValue({
        label: 'Name',
        type: FIELD_TYPE.INPUT,
        value: COMPONENT_INSTANCE_TEXT,
      })

      cy.createElementAndStoreId()

      cy.getCuiForm(MODEL_ACTION.CreateElement.key).should('not.exist', {
        timeout: 10000,
      })

      cy.getCuiTreeItemByPrimaryTitle(COMPONENT_INSTANCE_TEXT).click({
        force: true,
      })

      cy.getNewElementId().then((newElementId) => {
        cy.typeIntoTextEditor(COMPONENT_INSTANCE_TEXT, newElementId)
      })

      cy.openPreview().contains(COMPONENT_INSTANCE_TEXT).should('exist')
    })
  })
})
