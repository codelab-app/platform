import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import {
  AppCreateInput,
  AppPagesFieldInput,
} from '@codelab/shared/abstract/codegen'
import { IAtomType } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/data'
import { v4 } from 'uuid'
import { createAppInput } from '../support/database/app'
import { createPageInput } from '../support/database/page'

const ELEMENT_BUTTON = 'Button'
const backgroundColor1 = 'rgb(48, 182, 99)'
const backgroundColor2 = 'rgb(182, 99, 48)'

const createBackgroundColorStyle = (backgroundColorValue: string) =>
  `background-color: ${backgroundColorValue} !important; visibility: visible !important;`

const atomCache = 'atomCache'
const appCache = 'appCache'
const uidCache = 'uidCache'

describe('CSS CRUD', () => {
  before(() => {
    cy.resetDatabase()
    cy.login()
    cy.getCurrentUserId()
      .as(uidCache)
      .then((userId) => {
        const appInput: AppCreateInput = createAppInput(userId)
        appInput.pages = {
          create: [{ node: createPageInput() }],
        } as AppPagesFieldInput

        cy.createAtom([
          {
            name: ELEMENT_BUTTON,
            type: IAtomType.AntDesignButton,
            id: v4(),
            api: {
              create: {
                node: {
                  id: v4(),
                  name: `${IAtomType.AntDesignButton} API`,
                  owner: connectOwner(userId),
                },
              },
            },
          },
        ]).as(atomCache)

        cy.createApp(String(userId), appInput).as(appCache)
      })

    cy.then(function () {
      const app = this[appCache][0]

      cy.createElement({
        id: v4(),
        name: ELEMENT_BUTTON,
        rootOf: {
          connect: {
            where: { node: { id: app.pages[0].rootElement.id } },
          },
        },
        props: {
          create: { node: { data: JSON.stringify({}) } },
        },
        atom: {
          connect: {
            where: {
              node: {
                id: this[atomCache][0].id,
              },
            },
          },
        },
      })

      const pageId = app.pages[0].id
      cy.visit(`/apps/${app.id}/pages/${pageId}/builder`)
      cy.getSpinner().should('not.exist')

      cy.findByText(ROOT_ELEMENT_NAME).click({ force: true })
    })
  })

  describe('Add css', () => {
    it('should be able to add some css styling', () => {
      cy.getSpinner().should('not.exist')
      cy.findByText(ELEMENT_BUTTON).click()
      cy.get('[aria-label="format-painter"]').click()
      cy.getSpinner().should('not.exist')
      cy.get('[role="textbox"]')
        .click({ force: true })
        .type(createBackgroundColorStyle(backgroundColor1))

      cy.waitUntil(() =>
        cy
          .get('#render-root')
          .find('.ant-btn')
          .invoke('css', 'background-color')
          .then((bgColor) => String(bgColor) === backgroundColor1),
      )
    })
  })

  describe('Update css', () => {
    it('should be able to update the css styling', () => {
      cy.get('[role="textbox"]')
        .click({ force: true })
        .clear()
        .type(createBackgroundColorStyle(backgroundColor2))

      cy.waitUntil(() =>
        cy
          .get('#render-root')
          .find('.ant-btn')
          .invoke('css', 'background-color')
          .then((bgColor) => String(bgColor) === backgroundColor2),
      )
    })
  })

  describe('Remove css', () => {
    it('should be able to remove the css styling', () => {
      cy.get('[role="textbox"]').click({ force: true }).clear().type(' ')

      cy.waitUntil(() =>
        cy
          .get('#render-root')
          .find('.ant-btn')
          .invoke('css', 'background-color')
          .then((bgColor) => String(bgColor) !== backgroundColor1),
      )

      cy.waitUntil(() =>
        cy
          .get('#render-root')
          .find('.ant-btn')
          .invoke('css', 'background-color')
          .then((bgColor) => String(bgColor) !== backgroundColor2),
      )
    })
  })
})
