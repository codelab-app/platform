import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { AtomCreateInput } from '@codelab/shared/abstract/codegen'
import { createAtomsData } from '@codelab/shared/data/test'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import { v4 } from 'uuid'
import { createAppInput } from '../support/database/app'
import { loginSession } from '../support/nextjs-auth0/commands/login'

describe('Components Tab', () => {
  before(() => {
    cy.resetDatabase()
    loginSession()
    cy.getCurrentUserId()
      .then((userId) => {
        const atomsInput: Array<AtomCreateInput> = createAtomsData().map(
          (atom) => ({
            id: v4(),
            name: atom.name,
            type: atom.type,
            api: {
              create: {
                node: {
                  id: v4(),
                  name: `${atom.name} API`,
                  owner: userId ? connectAuth0Owner(userId) : undefined,
                },
              },
            },
          }),
        )

        cy.createAtom(atomsInput)

        return cy.createApp(createAppInput(userId))
      })
      .then((apps) => {
        const app = apps[0]
        const pageId = app?.pages[0]?.id
        cy.visit(`/apps/${app?.id}/pages/${pageId}/builder`)
        cy.getSpinner().should('not.exist')

        // builder selects root element after load
        // which resets tabs config pane tabs
        // therefore wait for it to be visible
        cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 }).should(
          'be.visible',
        )
      })
  })

  it('components should be loaded', () => {
    // antd tabs use internal id counter and tab "id" is computed based on initialization order.
    // so the ids of tabs may change depending on the order in which they are rendered:
    // rc-tabs-0-tab, rc-tabs-1-tab, rc-tabs-2-tab, etc...
    // so the id below may change anytime when components rendering order is changed.
    // therefore we use CSS3 selector to check if id ends with "component-tab"

    cy.get(`.ant-tabs-tab-btn[id$="component-tab"]`).click()

    cy.getSpinner().should('not.exist')

    cy.get(`.ant-tabs-tabpane[id$="component-tab"]`)
      .children()
      .should('have.length.greaterThan', 0)
  })
})
