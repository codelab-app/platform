import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { AtomCreateInput } from '@codelab/shared/abstract/codegen-v2'
import {
  createComponentInput,
  createListAtomInput,
  createListElementInput,
  createListItemAtomInput,
  createTextAtomInput,
  createTextReactNodeComponentInput,
  headerFieldName,
  listDataSource,
  listElementName,
  listItemComponentName,
  reactNodeTextComponentName,
  reactNodeTextProp,
  renderItemFieldName,
} from './createComponentInput'

const atomsInputs = (userId: string): Array<AtomCreateInput> => [
  createListAtomInput(userId),
  createListItemAtomInput(userId),
  createTextAtomInput(userId),
]

const componentsInputs = (
  userId: string,
  listItemAtomId: string,
  textAtomId: string,
) => [
  /**
   * create list item component
   * - RootElement - bind prop "value" to atom "text"'s text prop key
   *   - ListItem - Component
   *     - Text
   */

  createComponentInput(userId, textAtomId, listItemAtomId),
  // create test component with text prop = 'React Node"
  createTextReactNodeComponentInput(userId, textAtomId),
]

describe('Render props', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login().then(async () => {
        cy.getCurrentUserId().then((userId) => {
          /**
           * create :
           *  - list atom
           *  - list item atom
           *  - text atom
           */
          return cy.createAtom(atomsInputs(userId)).then((atoms) => {
            const [listAtom, listItemAtom, textAtom] = atoms
            const listId = listAtom.id
            const listItemId = listItemAtom.id
            const textId = textAtom.id
            const componentInput = componentsInputs(userId, listItemId, textId)

            /**
             * create :
             *  - listItem component
             *  - text component to be used as (React Node)
             */
            return cy.createComponent(componentInput).then(() =>
              /**
               * create :
               *  - app
               *  - page
               */
              cy.createPageFromScratch().then((data: any) => {
                const elementInput = createListElementInput(
                  listId,
                  data.rootElementId,
                )

                /**
                 * create :
                 * element with list atom
                 */
                return cy.createElement(elementInput).then(() => {
                  cy.visit(`/apps/${data.appId}/pages/${data.pageId}/builder`)
                })
              }),
            )
          })
        })
      })
    })
  })

  describe('render', () => {
    it('bind render props prop correctly', () => {
      // Go to List component
      cy.findByText(ROOT_ELEMENT_NAME).click()

      // click on prop panel
      cy.findByText('Props').click()

      cy.findByText(listElementName).should('be.visible').click({ force: true })

      cy.selectOptionItem(renderItemFieldName, listItemComponentName)
    })

    it('bind react node prop correctly', () => {
      cy.selectOptionItem(headerFieldName, reactNodeTextComponentName)
      cy.findByText('Submit').click()
    })

    it('render render props component correctly', () => {
      for (const item of listDataSource) {
        cy.findByText(item.value).should('exist')
      }
    })

    it('render react node component correctly', () => {
      cy.findByText(reactNodeTextProp.text).should('exist')
    })
  })
})
