import { v4 } from 'uuid'
import { loginSession } from '../support/nextjs-auth0/commands/login'

const ELEMENT_BUTTON = 'Button'
const backgroundColor1 = 'rgb(48, 182, 99)'
const backgroundColor2 = 'rgb(182, 99, 48)'
const atomName = `Atom${ELEMENT_BUTTON}`
const elementName = `Element${ELEMENT_BUTTON}`

const createBackgroundColorStyle = (backgroundColorValue: string) =>
  `background-color: ${backgroundColorValue} !important; visibility: visible !important;`

const atomCache = 'atomCache'
const appCache = 'appCache'
const uidCache = 'uidCache'

const clickEditor = () => {
  cy.get('[aria-label="format-painter"]').click()
  cy.getSpinner().should('not.exist')

  return (
    cy
      // https://stackoverflow.com/questions/58833459/cypresserror-timed-out-retrying-cy-click-failed-because-this-element-is-deta
      .get('[role="textbox"]')
      .first()
      // .should('be.visible')
      // .click({ force: true })
      // .trigger('click')
      .click({ force: true })
  )
}

describe('CSS CRUD', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()
    cy.getCurrentOwner()
      .as(uidCache)
      .then((owner) => {
        // cy.createAtom([
        //   {
        //     api: {
        //       create: {
        //         node: {
        //           id: v4(),
        //           name: `${IAtomType.AntDesignButton} API`,
        //           owner: connectAuth0Owner(owner),
        //         },
        //       },
        //     },
        //     id: v4(),
        //     name: atomName,
        //     type: IAtomType.AntDesignButton,
        //   },
        // ]).as(atomCache)
        // cy.createApp(createAppInput({ auth0Id })).as(appCache)
      })

    cy.then(function () {
      const app = this[appCache][0]
      const elementId = v4()
      // cy.createElement({
      //   id: elementId,
      //   name: elementName,
      //   parent: {
      //     connect: {
      //       where: { node: { id: app.pages[0].rootElement.id } },
      //     },
      //   },
      //   props: {
      //     create: { node: { data: JSON.stringify({}) } },
      //   },
      //   renderAtomType: {
      //     connect: {
      //       where: {
      //         node: {
      //           id: this[atomCache][0].id,
      //         },
      //       },
      //     },
      //   },
      // })

      // const pageId = app.pages[0].id
      // cy.visit(`/apps/${app.id}/pages/${pageId}/builder`)
      // cy.getSpinner().should('not.exist')

      // cy.findByText(elementName).click({ force: true })
    })
  })

  describe('Add css', () => {
    it('should be able to add some css styling', () => {
      cy.getSpinner().should('not.exist')
      cy.findByText(elementName).click()

      clickEditor().clear().type(createBackgroundColorStyle(backgroundColor1))

      cy.get('#render-root .ant-btn', { timeout: 30000 }).should(
        'have.css',
        'background-color',
        backgroundColor1,
      )
    })
  })

  describe('Update css', () => {
    it('should be able to update the css styling', () => {
      clickEditor()
        .clear({ force: true })
        .type(createBackgroundColorStyle(backgroundColor2))

      cy.get('#render-root .ant-btn', { timeout: 30000 }).should(
        'have.css',
        'background-color',
        backgroundColor2,
      )
    })
  })

  describe('Remove css', () => {
    it('should be able to remove the css styling', () => {
      clickEditor().clear({ force: true }).type(' ')

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
})
