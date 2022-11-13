import {
  AppCreateInput,
  AtomCreateInput,
} from '@codelab/shared/abstract/codegen'
import { connectOwner, createAtomsData } from '@codelab/shared/data'
import { v4 } from 'uuid'
import { createAppInput } from '../support/database/app'
import { createPageInput } from '../support/database/page'

const COMPONENTS_TAB_ID = 'rc-tabs-1-tab-component'
const COMPONENTS_TAB_PANEL_ID = 'rc-tabs-1-panel-component'

describe('Components Tab', () => {
  before(() => {
    cy.resetDatabase()
    cy.login()
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
                  owner: userId ? connectOwner(userId) : undefined,
                },
              },
            },
          }),
        )

        cy.createAtom(atomsInput)

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
        const pageId = app?.pages[0]?.id
        cy.visit(`/apps/${app?.id}/pages/${pageId}/builder`)
        cy.getSpinner().should('not.exist')
      })
  })

  it('components should be loaded', () => {
    cy.get(`#${COMPONENTS_TAB_ID}`).click()

    cy.getSpinner().should('not.exist')

    cy.get(`#${COMPONENTS_TAB_PANEL_ID}`)
      .children()
      .should('have.length.greaterThan', 0)
  })
})
