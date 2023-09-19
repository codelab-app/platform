import { loginAndSetupData } from '@codelab/frontend/test/cypress/nextjs-auth0'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { slugify } from '@codelab/shared/utils'
import { loginAndResetDatabase } from '@codelab/testing/cypress/nextjs-auth0'

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
  let app: IAppDTO

  before(() => {
    loginAndSetupData()
    cy.postApiRequest<IAppDTO>('/app/seed-cypress-app').then((apps) => {
      app = apps.body
    })
  })

  describe('Add css string', () => {
    it('should be able to add styling through css string', () => {
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          IPageKindName.Provider,
        )}/builder`,
      )
      cy.getSpinner().should('not.exist')
      cy.createElementTree([
        {
          atom: IAtomType.AntDesignButton,
          name: elementName,
          parentElement: ROOT_ELEMENT_NAME,
        },
      ])

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

      cy.get('[data-test-id="gui-display"] [title="None"]').click()

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

      // wait for multiple api calls that could occur
      // this is the simplest way for now
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)
      cy.findByText(elementName).click()

      cy.get('#render-root .ant-btn', { timeout: 30000 }).should(
        'have.css',
        'display',
        display,
      )
    })
  })
})
