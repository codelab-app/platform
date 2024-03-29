import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import {
  headerFieldName,
  listDataSource,
  listElementName,
  listItemComponentName,
  reactNodeTextComponentName,
  reactNodeTextProp,
  renderItemFieldName,
} from '../../data/create-component-input'

describe('Render props', () => {
  // before(() => {
  //   cy.resetDatabaseExceptForUserAndAtom().then(() => {
  //     loginSession().then(async () => {
  //       cy.getCurrentUser().then((userId) => {
  //         /**
  //          * create :
  //          *  - list atom
  //          *  - list item atom
  //          *  - text atom
  //          */
  //         return cy.createAtom(atomsInputs(userId)).then((atoms) => {
  //           const [listAtom, listItemAtom, textAtom] = atoms
  //           const listId = listAtom.id
  //           const listItemId = listItemAtom.id
  //           const textId = textAtom.id
  //           const componentInput = componentsInputs(userId, listItemId, textId)

  //           /**
  //            * create :
  //            *  - listItem component
  //            *  - text component to be used as (React Node)
  //            */
  //           return cy.createComponent(componentInput).then(() => {
  //             /**
  //              * create :
  //              *  - app
  //              *  - page
  //              */
  //             // cy.createPageFromScratch().then((data: any) => {
  //             // const elementInput = createListElementInput(
  //             //  listId,
  //             //  data.rootElementId,
  //             // )
  //             /**
  //              * create :
  //              * element with list atom
  //              */
  //             // return cy.createElement(elementInput).then(() => {
  //             //  cy.visit(`/apps/${data.appId}/pages/${data.pageId}/builder`)
  //             // })
  //             // })
  //           })
  //         })
  //       })
  //     })
  //   })
  // })

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
