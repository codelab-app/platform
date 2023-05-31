import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { loginSession } from '../support/nextjs-auth0/commands/login'

const ELEMENT_BUTTON = 'Button'
const backgroundColor1 = 'rgb(48, 182, 99)'
const backgroundColor2 = 'rgb(182, 99, 48)'
const display = 'none'
const elementName = `Element ${ELEMENT_BUTTON}`

const createBackgroundColorStyle = (backgroundColorValue: string) =>
  `background-color: ${backgroundColorValue};`

const clickEditor = () => {
  cy.get('[aria-label="format-painter"]').click()
  cy.getSpinner().should('not.exist')

  return cy.get('[role="textbox"]').first().click()
}

describe('CSS CRUD', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()

    cy.request('/api/cypress/atom')
      .then(() => cy.request('/api/cypress/app'))
      .then((apps) => {
        const app = apps.body

        cy.visit(`/apps/cypress/${app.name}/pages/_app/builder`)
        cy.getSpinner().should('not.exist')
        cy.createElementTree([
          {
            atom: IAtomType.AntDesignButton,
            name: elementName,
            parentElement: ROOT_ELEMENT_NAME,
          },
        ])
      })
  })

  describe('Add css string', () => {
    it('should be able to add styling through css string', () => {
      cy.getSpinner().should('not.exist')

      clickEditor()
        .clear()
        .type(createBackgroundColorStyle(backgroundColor1), { delay: 100 })

      cy.get('#render-root .ant-btn', { timeout: 30000 }).should(
        'have.css',
        'background-color',
        backgroundColor1,
      )
    })
  })

  describe('Update css string', () => {
    it('should be able to update styling through css string', () => {
      clickEditor()
        .clear({ force: true })
        .type(createBackgroundColorStyle(backgroundColor2), { delay: 100 })

      cy.get('#render-root .ant-btn', { timeout: 30000 }).should(
        'have.css',
        'background-color',
        backgroundColor2,
      )
    })
  })

  describe('Remove css string', () => {
    it('should be able to remove the css string', () => {
      clickEditor().clear({ force: true }).type(' ', { delay: 100 })

      cy.get('#render-root .ant-btn', { timeout: 30000 }).should(
        'not.have.css',
        'background-color',
        backgroundColor1,
      )

      cy.get('#render-root .ant-btn', { timeout: 30000 }).should(
        'not.have.css',
        'background-color',
        backgroundColor2,
      )
    })
  })

  describe('Add GUI style', () => {
    it('should be able to add styling through GUI', () => {
      cy.getSpinner().should('not.exist')

      cy.get('.ant-collapse-item-active .ant-btn').click()
      cy.findByText(display).click()

      cy.get('#render-root .ant-btn', { timeout: 30000 }).should(
        'have.css',
        'display',
        display,
      )

      cy.waitForApiCalls()
    })
  })

  describe('Css and GUI style persistance', () => {
    it('should persist styles after reload', () => {
      cy.reload()
      cy.getSpinner().should('not.exist')
      cy.findByText(elementName).click()

      cy.get('#render-root .ant-btn', { timeout: 30000 }).should(
        'have.css',
        'display',
        display,
      )
    })
  })
})
