/* eslint-disable jest/expect-expect */
import {
  IActionKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/data'
import { v4 } from 'uuid'
import { FIELD_TYPE } from '../support/antd/form'
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
    cy.login()
    cy.getCurrentUserId()
      .then((userId) => {
        cy.createType(
          {
            PrimitiveType: {
              id: v4(),
              name: IPrimitiveTypeKind.Integer,
              primitiveKind: IPrimitiveTypeKind.Integer,
              kind: ITypeKind.PrimitiveType,
              owner: connectOwner(userId),
            },
          },
          ITypeKind.PrimitiveType,
        )

        return cy.createApp(userId)
      })
      .then((apps) => {
        const app = apps[0]

        cy.visit(`/apps/${app?.id}/pages`)
        cy.getSpinner().should('not.exist')
        cy.findByText('Store').click()
        cy.url({ timeout: 10000 }).should('include', 'store')
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
          value: IPrimitiveTypeKind.Integer,
          type: FIELD_TYPE.SELECT,
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
      it('should be able to create  action', () => {
        cy.findByTitle('Create Action').click({ force: true })

        cy.getModal().setFormFieldValue({ label: 'Name', value: actionName })

        cy.getModal().setFormFieldValue({ label: 'Name', value: actionName })

        cy.getModal().setFormFieldValue({
          label: 'Type',
          value: IActionKind.CustomAction,
          type: FIELD_TYPE.SELECT,
        })

        cy.getModal().setFormFieldValue({
          label: 'Action code',
          value: actionBody,
          type: FIELD_TYPE.MONACO,
        })

        cy.getModal()
          .getModalAction(/Create Action/)
          .click()

        cy.getModal().should('not.exist')

        cy.findByText(actionName).should('exist')
      })
    })

    describe('update', () => {
      it('should be able to update  action name', () => {
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
      it('should be able to delete  action', () => {
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
