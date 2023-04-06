import { IActionKind, IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { FIELD_TYPE } from '../support/antd/form'
import { loginSession } from '../support/nextjs-auth0/commands/login'
import {
  actionBody,
  actionName,
  stateVarName,
  updatedActionName,
  updatedStateVarName,
} from './store.data'

describe('Store', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()
    cy.getCurrentOwner()
      .then((owner) => {
        // cy.createType(
        //   {
        //     PrimitiveType: {
        //       id: v4(),
        //       kind: ITypeKind.PrimitiveType,
        //       name: IPrimitiveTypeKind.Integer,
        //       owner: connectAuth0Owner(owner),
        //       primitiveKind: IPrimitiveTypeKind.Integer,
        //     },
        //   },
        //   ITypeKind.PrimitiveType,
        // )
        // return cy.createApp(createAppInput({ auth0Id }))
      })
      .then((apps) => {
        // const app = apps[0]
        // cy.visit(`/apps/${app.id}/pages`)
        // cy.getSpinner().should('not.exist')
        // cy.findByText('Store').click()
        // cy.url({ timeout: 10000 }).should('include', 'store')
      })
  })

  describe('State CRUD', () => {
    describe('create', () => {
      it('should be able to create state variable', () => {
        cy.findByTitle('Create State').click({ force: true })
        cy.getModal().setFormFieldValue({ label: 'Key', value: stateVarName })
        cy.getModal().setFormFieldValue({ label: 'Name', value: stateVarName })
        cy.getModal().setFormFieldValue({
          label: 'Type',
          type: FIELD_TYPE.SELECT,
          value: IPrimitiveTypeKind.Integer,
        })
        cy.getModal()
          .getModalAction(/Create/)
          .click()
        cy.getModal().should('not.exist')
        cy.findByTitle(stateVarName).should('exist')
      })
    })

    describe('update', () => {
      it('should be able to update state variable name', () => {
        cy.getListItem(stateVarName).getButton({ icon: 'edit' }).click()
        cy.getSpinner().should('not.exist')

        cy.getModal().setFormFieldValue({
          label: 'Name',
          value: updatedStateVarName,
        })

        cy.getModal()
          .getModalAction(/Update/)
          .click()
        cy.getModal().should('not.exist')

        cy.findByText(stateVarName).should('not.exist')
        cy.findByTitle(updatedStateVarName).should('exist')
      })
    })

    describe('delete', () => {
      it('should be able to delete state variable', () => {
        cy.getListItem(updatedStateVarName)
          .getButton({ icon: 'delete' })
          .click()
        cy.getSpinner().should('not.exist')

        cy.getModal()
          .getModalAction(/Delete/)
          .click()
        cy.getModal().should('not.exist')

        cy.findByTitle(updatedStateVarName).should('not.exist')
      })
    })
  })

  describe('Action CRUD', () => {
    describe('create', () => {
      it('should be able to create action', () => {
        cy.findByTitle('Create Action').click({ force: true })

        cy.getModal().setFormFieldValue({ label: 'Name', value: actionName })

        cy.getModal().setFormFieldValue({ label: 'Name', value: actionName })

        cy.getModal().setFormFieldValue({
          label: 'Type',
          type: FIELD_TYPE.SELECT,
          value: IActionKind.CodeAction,
        })

        cy.getModal().setFormFieldValue({
          label: 'Action code',
          type: FIELD_TYPE.CODE_MIRROR,
          value: actionBody,
        })

        cy.getModal()
          .getModalAction(/Create Action/)
          .click()

        cy.getModal().should('not.exist')

        cy.findByText(actionName).should('exist')
      })
    })

    describe('update', () => {
      it('should be able to update action name', () => {
        cy.getListItem(actionName)
          .getButton({
            icon: 'edit',
          })
          .click()
        cy.getSpinner().should('not.exist')

        cy.getModal().setFormFieldValue({
          label: 'Name',
          value: updatedActionName,
        })

        cy.getModal()
          .getModalAction(/Update Action/)
          .click()
        cy.getModal().should('not.exist')

        cy.findByText(actionName).should('not.exist')
        cy.findByText(updatedActionName).should('exist')
      })
    })

    describe('delete', () => {
      it('should be able to delete action', () => {
        cy.getListItem(actionName)
          .getButton({
            icon: 'delete',
          })
          .click()
        cy.getSpinner().should('not.exist')

        cy.getModal()
          .getModalAction(/Delete Action/)
          .click()
        cy.getModal().should('not.exist')

        cy.findAllByText(updatedActionName).should('not.exist')
      })
    })
  })
})
