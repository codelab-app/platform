import {
  APP_PAGE_NAME,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { FIELD_TYPE } from '../support/antd/form'
import { seedData } from './admin/assert'
import { appName, pageName } from './apps/app.data'

const CONFIG_PROVIDER_NAME = 'config provider'
const CARD_COMPONENT_NAME = 'card component'
const INPUT_COMPONENT_NAME = 'input component'

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

const openPageByHeaderMenu = (name: string) => {
  cy.get('header .anticon-file').click()
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

    cy.getModal().setFormFieldValue({
      label: 'Render Type',
      value: 'Atom',
      type: FIELD_TYPE.SELECT,
    })
    cy.getModal().setFormFieldValue({
      label: 'Atom',
      value: IAtomType.AntDesignConfigProvider,
      type: FIELD_TYPE.SELECT,
    })
    cy.getModal().findByLabelText('Name').clear().type(CONFIG_PROVIDER_NAME)
    cy.getModal()
      .getModalAction(/Create/)
      .click()
    cy.getModal().should('not.exist')
  })

  it('should set config provider element as a container for child pages', () => {
    cy.get(`.ant-tabs [aria-label="file"]`).click()
    cy.get('.ant-tabs-tabpane-active form').setFormFieldValue({
      label: 'Page container element id',
      value: CONFIG_PROVIDER_NAME,
      type: FIELD_TYPE.SELECT,
    })

    // After props are changed - need to wait for the corresponding API call
    // which is sent to the server in order to save this change to the database.
    // Otherwise, there is a risk that `cy.go('back')` will prevent the request from being sent
    cy.waitForApiCalls()

    cy.go('back')
    cy.getSider().find('.ant-page-header-heading').should('be.visible')
  })

  it('should be able to create simple page', () => {
    cy.getSider()
      .find('.ant-page-header-heading')
      .getButton({ icon: 'plus' })
      .should('exist')
      .click()

    cy.getModal().should('be.visible').findByLabelText('Name').type(pageName)
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
  })

  it('should be able to toggle "Component Disabled" AntDesignConfigProvider prop on _app page', () => {
    openPageByHeaderMenu(APP_PAGE_NAME)

    cy.findByText(CONFIG_PROVIDER_NAME).click()

    cy.get(`.ant-tabs [aria-label="setting"]`).click()
    cy.findByLabelText(/Component Disabled/).click({ force: true })
  })

  it('should render the input in disabled state', () => {
    openPageByHeaderMenu(pageName)

    cy.get('#render-root .ant-card-body input').should('be.disabled')

    cy.get('header .anticon-eye').click()
    cy.get('header .anticon-tool', { timeout: 30000 }).should('be.visible')

    cy.get('#render-root .ant-card-body input').should('be.disabled')
  })
})
