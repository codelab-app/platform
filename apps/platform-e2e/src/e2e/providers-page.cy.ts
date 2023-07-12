import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { FIELD_TYPE } from '../support/antd/form'
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
  // Takes a while to load the pages
  cy.contains('.ant-list-item a', name).should('exist', { timeout: 15000 })
  cy.contains('.ant-list-item a', name).click()
  cy.getSpinner().should('not.exist')
  cy.contains('.ant-tree-list', ROOT_ELEMENT_NAME, { timeout: 15000 }).should(
    'be.visible',
  )
}

describe('_app page', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.request('/api/cypress/atom')
  })

  it('should create _app page when app is created', () => {
    cy.findAllByText(appName, { exact: true, timeout: 0 }).should('not.exist')

    cy.getButton({ label: /Create Now/ }).click()
    cy.getModal().setFormFieldValue({ label: 'Name', value: appName })
    cy.getModal()
      .getModalAction(/Create App/)
      .click()
    cy.getModal().should('not.exist')

    cy.findByText(appName).click()
    cy.getListItem(IPageKindName.Provider)
      .findByText(IPageKindName.Provider)
      .should('be.visible')
  })

  it('should be able to add card component to the _app page', () => {
    openPageByName(IPageKindName.Provider)

    cy.createElementTree(providerPageElements)
  })

  it('should set card element as a container for child pages', () => {
    cy.get(`.ant-tabs [aria-label="file"]`).click()
    cy.get(`.ant-tabs [aria-label="file"]`).click()
    cy.get('.ant-tabs-tabpane-active form').setFormFieldValue({
      label: 'Page Content Container',
      type: FIELD_TYPE.SELECT,
      value: CARD_COMPONENT_NAME,
    })

    // After props are changed - need to wait for the corresponding API call
    // which is sent to the server in order to save this change to the database.
    // Otherwise, there is a risk that `cy.go('back')` will prevent the request from being sent
    cy.waitForApiCalls()

    cy.get('li[title="Pages"]').should('be.visible').click()

    cy.getSpinner().should('not.exist')
    cy.getListItem(IPageKindName.Provider)
      .findByText(IPageKindName.Provider)
      .should('be.visible')
  })

  it('should be able to create simple page', () => {
    cy.getSider().getButton({ icon: 'plus' }).click()
    cy.findByTestId('create-page-form').findByLabelText('Name').type(pageName)
    cy.findByTestId('create-page-form')
      .getButton({ label: 'Create Page' })
      .click()

    openPageByName(pageName)
  })

  it('should be able to add input atom to the page', () => {
    cy.createElementTree(mainPageElements)
  })

  it('should render the input inside the card in builder and viewer', () => {
    cy.get('#render-root .ant-card-body input').should('not.be.disabled')

    cy.get('.anticon-eye').click()
    cy.get('.anticon-tool', { timeout: 30000 }).should('be.visible')
    cy.get('#render-root .ant-card-body input').should('not.be.disabled')
  })
})
