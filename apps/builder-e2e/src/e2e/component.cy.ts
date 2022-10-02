import { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { IAtomType } from '@codelab/shared/abstract/core'
import { connectTypeOwner } from '@codelab/shared/data'
import { v4 } from 'uuid'
import { FIELD_TYPE } from '../support/antd/form'
import { createAppInput } from '../support/database/app'
import { createPageInput } from '../support/database/page'

const NEW_COMP_NAME = 'new component'
const CHILD_BUTTON = 'Button'
const CHILD_TEXT = 'Text'
const UPDATED_COMP_NAME = 'updated component'

interface ComponentChildData {
  name: string
  atom: string
}

const componentChildren: Array<ComponentChildData> = [
  { name: CHILD_BUTTON, atom: IAtomType.AntDesignButton },
  { name: CHILD_TEXT, atom: IAtomType.AntDesignTypographyText },
]

describe('Component CRUD', () => {
  before(() => {
    cy.resetDatabase()
    cy.login()
    cy.getCurrentUserId()
      .then((userId) => {
        cy.createAtom([
          {
            name: IAtomType.AntDesignButton,
            type: IAtomType.AntDesignButton,
            id: v4(),
            api: {
              create: {
                node: {
                  id: v4(),
                  name: `${IAtomType.AntDesignButton} API`,
                  owner: connectTypeOwner(userId),
                },
              },
            },
          },
          {
            name: IAtomType.AntDesignTypographyText,
            type: IAtomType.AntDesignTypographyText,
            id: v4(),
            api: {
              create: {
                node: {
                  id: v4(),
                  name: `${IAtomType.AntDesignTypographyText} API`,
                  owner: connectTypeOwner(userId),
                },
              },
            },
          },
        ])

        const appInput: AppCreateInput = {
          ...createAppInput(userId),
          pages: {
            create: [{ node: createPageInput() }],
          },
        }

        return cy.createApp(userId, appInput)
      })
      .then((apps) => {
        const app = apps[0]
        const pageId = app.pages[0].id
        cy.visit(`/apps/${app.id}/pages/${pageId}/builder`)
        cy.getSpinner().should('not.exist')
      })
  })

  describe('Add component', () => {
    it('should be able to add a new component', () => {
      cy.getSider().getButton({ icon: 'plus' }).eq(1).click()

      cy.getModal().findByLabelText('Name').type(NEW_COMP_NAME)

      cy.getModal()
        .getModalAction(/Create/)
        .click()
      cy.getModal().should('not.exist', { timeout: 10000 })

      cy.get('[title="Components"]')
        .parent()
        .find('.ant-tree-switcher_close')
        .click()

      cy.findByText(NEW_COMP_NAME).should('exist')
    })

    it('should be available to add when adding page element', () => {
      cy.getSider()
        .find('.ant-page-header-heading')
        .getButton({ icon: 'plus' })
        .click()

      cy.getModal().findByLabelText('Name').type(NEW_COMP_NAME)
      cy.getModal().setFormFieldValue({
        label: 'Component',
        value: NEW_COMP_NAME,
        type: FIELD_TYPE.SELECT,
      })

      cy.getModal()
        .getModalAction(/Create/)
        .click()
      cy.getModal().should('not.exist', { timeout: 10000 })
    })
  })

  describe('Add elements to component', () => {
    it('should be able to add elements to the component', () => {
      cy.get(`[title="${NEW_COMP_NAME}"]`)
        .closest('div')
        .find('.ant-tree-switcher_close')
        .click()

      cy.wrap(componentChildren)
        .each((child: ComponentChildData) => {
          const { name, atom } = child
          cy.get(`[title="${NEW_COMP_NAME}"]`)
            .eq(2)
            .find('.ant-dropdown-trigger')
            .rightclick({ force: true })
          cy.contains(/Add child/).click({ force: true })

          cy.getModal().setFormFieldValue({
            label: 'Name',
            value: name,
          })

          cy.getModal().setFormFieldValue({
            label: 'Atom',
            value: atom,
            type: FIELD_TYPE.SELECT,
          })

          cy.getModal()
            .getModalAction(/Create/)
            .click()
          cy.getModal().should('not.exist', { timeout: 10000 })
        })
        .then(() => {
          // check if the elements exist in the render root
          cy.get('#Builder').find('.ant-btn').should('exist')
          cy.get('#Builder').find('.ant-typography').should('exist')
        })
    })
  })

  describe('Get component', () => {
    it('should render component items correctly', () => {
      cy.reload()

      // expand components list
      cy.get('[title="Components"]')
        .parent()
        .find('.ant-tree-switcher_close')
        .click()

      // the 1 is on the element tree
      cy.findAllByText(NEW_COMP_NAME).should('have.length', 2)
      cy.findAllByText(NEW_COMP_NAME).eq(1).click({ force: true })

      // the 2 is the component builder tree
      cy.findAllByText(NEW_COMP_NAME).should('have.length', 3)
      cy.findAllByText(NEW_COMP_NAME).eq(2).click()

      // the 3 is root of the component on component builder tree
      cy.findByText(CHILD_BUTTON).should('exist')
      cy.findByText(CHILD_TEXT).should('exist')
    })
  })

  describe('Update component', () => {
    it('should be able to update the component', () => {
      cy.get(`[title="${NEW_COMP_NAME}"]`).eq(1).click()
      cy.findByLabelText('Name').clear().type(UPDATED_COMP_NAME)

      cy.findByText(UPDATED_COMP_NAME).should('exist')
    })
  })

  describe('Remove component', () => {
    it('should be able to remove the component', () => {
      cy.get(`[title="${UPDATED_COMP_NAME}"]`).rightclick()
      cy.contains(/Delete/).click({ force: true })
      cy.getModal()
        .getModalAction(/Delete/)
        .click()
      cy.findByText(UPDATED_COMP_NAME).should('not.exist')
    })
  })
})
