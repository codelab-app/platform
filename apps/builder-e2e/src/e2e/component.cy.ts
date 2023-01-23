import { IAtomType } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/data'
import { v4 } from 'uuid'
import { createAppInput } from '../support/database/app'

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

let testApp: any
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
                  owner: connectOwner(userId),
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
                  owner: connectOwner(userId),
                },
              },
            },
          },
        ])

        return cy.createApp(createAppInput(userId))
      })
      .then((apps) => {
        testApp = apps

        const app = apps[0]
        // const pageId = app?.pages[0]?.id
        // cy.visit(`/apps/${app?.id}/pages/${pageId}/builder`)
        // cy.getSpinner().should('not.exist')
      })
  })

  describe('Add component', () => {
    it('should be able to add a new component', () => {
      cy.log('my app', JSON.stringify(testApp, null, 2))
      // cy.getSider().getButton({ icon: 'plus' }).eq(1).click()
      // cy.getModal().findByLabelText('Name').type(NEW_COMP_NAME)
      // cy.getModal()
      //   .getModalAction(/Create/)
      //   .click()
      // cy.getModal().should('not.exist', { timeout: 10000 })
      // cy.get('[title="Components"]')
      //   .parent()
      //   .find('.ant-tree-switcher_close')
      //   .click()
      // cy.findByText(NEW_COMP_NAME).should('exist')
    })
  })
})
