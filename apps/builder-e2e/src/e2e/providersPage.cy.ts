import {
  APP_PAGE_NAME,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { FIELD_TYPE } from '../support/antd/form'
import { seedData } from './admin/assert'
import { appName, appSlug, pageName, pageSlug } from './apps/app.data'

const CONFIG_PROVIDER_NAME = 'ConfigProvider'
const CARD_COMPONENT_NAME = 'Card Component'
const INPUT_COMPONENT_NAME = 'Input Component'

const mainPageElements = [
  {
    name: CARD_COMPONENT_NAME,
    parentElement: ROOT_ELEMENT_NAME,
    atom: IAtomType.AntDesignCard,
  },
  {
    name: INPUT_COMPONENT_NAME,
    parentElement: CARD_COMPONENT_NAME,
    atom: IAtomType.AntDesignInput,
  },
]

const openPageByName = (name: string) => {
  cy.findByText(name).click()
  cy.getSpinner().should('not.exist')
  cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 }).should('be.visible')
}

describe('_app page', () => {
  before(() => {
    cy.resetDatabase()
    cy.login()
    cy.visit('/apps')
    cy.getSpinner().should('not.exist')

    seedData()
  })

  it('should create _app page when app is created', () => {
    cy.findAllByText(appName, { exact: true, timeout: 0 }).should('not.exist')

    cy.getButton({ label: /Create App/ }).click()
    cy.getModal().setFormFieldValue({ label: 'Name', value: appName })
    cy.getModal().setFormFieldValue({ label: 'Slug', value: appSlug })
    cy.getModal()
      .getModalAction(/Create App/)
      .click()
    cy.getModal().should('not.exist')

    cy.findByText(appName).click()
    cy.findByText(APP_PAGE_NAME).should('exist')
  })

  it('should be able to add config provider atom to the _app page', () => {
    openPageByName(APP_PAGE_NAME)

    cy.getSider()
      .find('.ant-page-header-heading')
      .getButton({ icon: 'plus' })
      .click()

    cy.getModal().findByLabelText('Name').type(CONFIG_PROVIDER_NAME)
    cy.getModal().setFormFieldValue({
      label: 'Atom',
      value: IAtomType.AntDesignConfigProvider,
      type: FIELD_TYPE.SELECT,
    })
    cy.getModal()
      .getModalAction(/Create/)
      .click()
    cy.getModal().should('not.exist')

    cy.go('back')
    cy.getSider().find('.ant-page-header-heading').should('be.visible')
  })

  it('should be able to create simple page', () => {
    cy.getSider()
      .find('.ant-page-header-heading')
      .getButton({ icon: 'plus' })
      .click()

    cy.getModal().findByLabelText('Name').type(pageName)
    cy.getModal().findByLabelText('Slug').type(pageSlug)
    cy.getModal()
      .getModalAction(/Create Page/)
      .click()
    cy.getModal().should('not.exist')

    openPageByName(pageName)
  })

  it('should be able to add card and input atoms to the page', () => {
    cy.createElementTree(mainPageElements)
  })

  it('should render the input in enabled state in builder and viewer', () => {
    cy.get('#Builder .ant-card-body input').should('not.be.disabled')

    cy.get('header .anticon-eye').click()
    cy.get('header .anticon-tool', { timeout: 30000 }).should('be.visible')
    cy.get('#render-root .ant-card-body input').should('not.be.disabled')

    cy.go('back')
    cy.go('back')
  })

  it('should be able to toggle "Component Disabled" AntDesignConfigProvider prop on _app page', () => {
    openPageByName(APP_PAGE_NAME)

    cy.findByText(CONFIG_PROVIDER_NAME).click()

    cy.get(`[aria-label="setting"]`).click()
    cy.findByLabelText(/Component Disabled/).click()

    // After atom props are changed - need to wait for the corresponding API call
    // which is sent to the server in order to save this change to the database.
    // Otherwise, there is a risk that `cy.go('back')` will prevent the request from being sent
    cy.waitForApiCalls()

    cy.go('back')
  })

  it('should render the input in disabled state', () => {
    openPageByName(pageName)

    cy.get('#render-root .ant-card-body input').should('be.disabled')

    cy.get('header .anticon-eye').click()
    cy.get('header .anticon-tool', { timeout: 30000 }).should('be.visible')

    cy.get('#render-root .ant-card-body input').should('be.disabled')
  })
})
