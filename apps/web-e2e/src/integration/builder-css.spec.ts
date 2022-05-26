import { IAtomExport, IAtomType } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { FIELD_TYPE } from '../support/antd/form'
import {
  appName,
  backgroundColor1,
  backgroundColor2,
  buttonAtom,
  buttonName,
  pageName,
} from './builder-css.data'

const createAtomsInput = (atom: IAtomExport, userId: string) => {
  return {
    id: v4(),
    name: atom.name,
    type: atom.type,
    api: {
      create: {
        node: {
          id: v4(),
          name: `${atom.name} API`,
          owner: userId
            ? { connect: { where: { node: { auth0Id: userId } } } }
            : undefined,
        },
      },
    },
  }
}

const createBackgroundColorStyle = (backgroundColorValue: string) =>
  `background-color: ${backgroundColorValue} !important; visibility: visible !important;`

describe('Builder css', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login().then(() => {
        cy.getCurrentUserId().then((userId) => {
          /**
           * Create a few atoms to use in the test
           */
          cy.createAtom(createAtomsInput(buttonAtom, userId)).then(() => {
            cy.visit('/apps')
          })

          cy.getSpinner().should('not.exist')

          /**
           * Create a new app to use in the test
           */

          // Check that we don't have app with test-name
          cy.findAllByText(appName, { exact: true, timeout: 0 }).should(
            'not.exist',
          )

          cy.getButton({ label: /Create App/ }).click()

          cy.getModal().setFormFieldValue({ label: 'Name', value: appName })
          cy.getModal()
            .getModalAction(/Create App/)
            .click()
          cy.getModal().should('not.exist')

          cy.findByText(appName).should('exist')
          cy.findByText(appName).click()

          cy.findByText('Pages').should('be.visible')
          cy.getSpinner().should('not.exist')

          /**
           * Create a new page to use in the text
           */
          cy.getButton({
            icon: 'plus',
          }).click()

          cy.getModal().setFormFieldValue({ label: 'Name', value: pageName })
          cy.getModal()
            .getModalAction(/Create Page/)
            .click()
          cy.getModal().should('not.exist')

          cy.findByText(pageName).should('exist')
          cy.findByText(pageName).click()

          cy.findByText('Page').should('be.visible')
          cy.getSpinner().should('not.exist')

          /**
           * Create a button element to test styling with it
           */
          cy.getButton({
            icon: 'plus',
          })
            .first()
            .click()

          cy.getModal().setFormFieldValue({ label: 'Name', value: buttonName })
          cy.getModal().setFormFieldValue({
            label: 'Atom',
            value: IAtomType.AntDesignButton,
            type: FIELD_TYPE.SELECT,
          })

          cy.getModal()
            .getModalAction(/Create/)
            .click()
          cy.getModal().should('not.exist')

          /**
           * Expand the element tree to make the newly added button visible (clickable)
           */
          cy.get('.ant-tree-switcher_close').should('exist')
          cy.get('.ant-tree-switcher_close').click()

          // Although the button is visible, it is not clickable unless we wait for a bit
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(1000)
        })
      })
    })
  })

  describe('Add css', () => {
    it('should be able to add some css styling', () => {
      cy.findByText(buttonName).should('be.visible')
      cy.findByText(buttonName).click()

      cy.get('[aria-label="format-painter"]').should('be.visible')
      cy.get('[aria-label="format-painter"]').click()

      cy.getSpinner().should('not.exist')

      cy.get('.monaco-editor')
        .find('textarea')
        .type(createBackgroundColorStyle(backgroundColor1))

      cy.get('.Builder-none').should(
        'have.css',
        'background-color',
        backgroundColor1,
      )
    })
  })

  describe('Update css', () => {
    it('should be able to update the css styling', () => {
      cy.findByText(buttonName).should('be.visible')
      cy.findByText(buttonName).click()

      cy.get('[aria-label="format-painter"]').should('be.visible')
      cy.get('[aria-label="format-painter"]').click()

      cy.getSpinner().should('not.exist')

      cy.get('.monaco-editor')
        .find('textarea')
        .clear()
        .type(createBackgroundColorStyle(backgroundColor2))

      cy.get('.Builder-none').should(
        'have.css',
        'background-color',
        backgroundColor2,
      )
    })
  })

  describe('Remove css', () => {
    it('should be able to remove the css styling', () => {
      cy.findByText(buttonName).should('be.visible')
      cy.findByText(buttonName).click()

      cy.get('[aria-label="format-painter"]').should('be.visible')
      cy.get('[aria-label="format-painter"]').click()

      cy.getSpinner().should('not.exist')

      cy.get('.monaco-editor').find('textarea').clear().type(' ')

      cy.get('.Builder-none').should(
        'not.have.css',
        'background-color',
        backgroundColor1,
      )

      cy.get('.Builder-none').should(
        'not.have.css',
        'background-color',
        backgroundColor2,
      )
    })
  })
})
