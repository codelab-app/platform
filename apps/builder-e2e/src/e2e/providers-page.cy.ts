import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { FIELD_TYPE } from '../support/antd/form'
import { assertTwice } from '../support/helpers'
import { loginSession } from '../support/nextjs-auth0/commands/login'
import { appName, pageName } from './apps/app.data'

const CARD_COMPONENT_NAME = 'Card Component'
const INPUT_COMPONENT_NAME = 'Input Component'

const providerPageElements = [
  {
    atom: IAtomType.AntDesignCard,
    name: CARD_COMPONENT_NAME,
    parentElement: ROOT_ELEMENT_NAME,
  },
]

const mainPageElements = [
  {
    atom: IAtomType.AntDesignInput,
    name: INPUT_COMPONENT_NAME,
    parentElement: ROOT_ELEMENT_NAME,
  },
]

const openPageByName = (name: string) => {
  cy.findByText(name).click()
  cy.getSpinner().should('not.exist')

  assertTwice(() =>
    cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 }).should('be.visible'),
  )
}

describe('_app page', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.getCurrentOwner().then((owner: IAuth0Owner) => {
      cy.request('/api/cypress/atom')
    })
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

    assertTwice(() => cy.findByText(IPageKindName.Provider).should('exist'))
  })

  it('should be able to add card component to the _app page', () => {
    openPageByName(IPageKindName.Provider)

    cy.createElementTree(providerPageElements)
  })

  it('should set card element as a container for child pages', () => {
    cy.get(`.ant-tabs [aria-label="file"]`).click()
    cy.get(`.ant-tabs [aria-label="file"]`).click()
    cy.get('.ant-tabs-tabpane-active form').setFormFieldValue({
      label: 'Id',
      type: FIELD_TYPE.SELECT,
      value: CARD_COMPONENT_NAME,
    })

    // After props are changed - need to wait for the corresponding API call
    // which is sent to the server in order to save this change to the database.
    // Otherwise, there is a risk that `cy.go('back')` will prevent the request from being sent
    cy.waitForApiCalls()

    cy.get('.ant-layout-sider a[href]').eq(1).click()

    assertTwice(() => cy.findAllByText(IPageKindName.Provider).should('exist'))
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
    cy.getSpinner().should('not.exist')
    cy.getModal().should('not.exist')

    openPageByName(pageName)
  })

  it('should be able to add input atom to the page', () => {
    cy.createElementTree(mainPageElements)
  })

  it('should render the input inside isnide the card in builder and viewer', () => {
    cy.get('#Builder .ant-card-body input').should('not.be.disabled')

    cy.get('header .anticon-eye').click()
    cy.get('header .anticon-tool', { timeout: 30000 }).should('be.visible')
    cy.get('#render-root .ant-card-body input').should('not.be.disabled')
  })
})
