import { AtomType, BaseTypeName, TypeKind } from '@codelab/shared/abstract/core'
import {
  Atom,
  CreateResponse,
  Element,
  Page,
} from '@codelab/shared/codegen/graphql'
import {
  REACT_NODE_PROPS_ACCESSOR,
  RENDER_PROPS_ACCESSOR,
} from '@codelab/shared/constants'

const listElementName = 'List'
const renderItemFieldName = 'Render Item'
const headerFieldName = 'Header'
const listItemComponentName = 'ListItem'
const reactNodeTextComponentName = 'Text'
const reactNodeTextProp = { text: 'React Node' }
const listDataSource = [{ value: 'test1' }, { value: 'test2' }]
let textAtomId: string
let listItemRootElId: string

describe('render props', () => {
  describe('render', () => {
    before(() => {
      cy.resetDgraphData()

      cy.login().then(async () => {
        cy.preserveAuthCookies()
        cy.createType({
          name: BaseTypeName.RenderProps,
          typeKind: TypeKind.RenderPropsType,
        }).then((renderPropType: CreateResponse) => {
          cy.wrap(renderPropType.id).as('renderPropTypeId')
        })

        cy.createAtom({
          name: 'Text',
          type: AtomType.Text,
        }).then((textAtom: CreateResponse) => {
          textAtomId = textAtom.id
        })

        /**
         * create list item component
         * - RootElement - bind prop "value" to atom "text"'s text prop key
         *     - ListItem
         *         - Text
         */
        cy.createAtom({
          name: 'ListItem',
          type: AtomType.AntDesignListItem,
        }).then((listItemAtom: CreateResponse) => {
          cy.createComponent({ name: listItemComponentName })

            .then(cy.getComponentRootElementId)
            .then((_listItemRootElId) => {
              // create list item element, attach to root
              listItemRootElId = _listItemRootElId

              return cy.createElement({
                parentElementId: _listItemRootElId,
                atomId: listItemAtom.id,
              })
            })
            .then((listItemElement: CreateResponse) => {
              // create text element, attach to list item
              return cy
                .createElement({
                  parentElementId: listItemElement.id,
                  atomId: textAtomId,
                })
                .then((textElement: CreateResponse) => {
                  // create prop mapping from root to text
                  // bind prop "value" to element "text"'s text prop key
                  cy.createPropBinding({
                    elementId: listItemRootElId,
                    targetElementId: textElement.id,

                    sourceKey: 'value',
                    targetKey: 'text',
                  })
                })
            })
        })

        /**
         * Create page
         * Create List component, attach to RootElement of the page
         *   - set dataSource to {value:string}[]
         */
        cy.createAtom({ name: 'List', type: AtomType.AntDesignList }).then(
          (listAtom: CreateResponse) => {
            cy.getAtom({ where: { id: listAtom.id } }).then(
              (listAtomFull: Atom) => {
                cy.get('@renderPropTypeId').then((renderPropTypeId) => {
                  // set render item field to render props type
                  cy.createField({
                    name: headerFieldName,
                    key: `${REACT_NODE_PROPS_ACCESSOR}.header`,
                    interfaceId: listAtomFull.api.id,
                    type: { existingTypeId: String(renderPropTypeId) },
                  })
                  cy.createField({
                    name: renderItemFieldName,
                    key: `${RENDER_PROPS_ACCESSOR}.renderItem`,
                    interfaceId: listAtomFull.api.id,
                    type: { existingTypeId: String(renderPropTypeId) },
                  })
                })
              },
            )

            cy.createPageFromScratch()
              .then((page: Page) => {
                const rootElement = page.elements?.vertices?.[0]

                return cy.createElement({
                  atomId: listAtom.id,
                  name: listElementName,
                  parentElementId: String(rootElement?.id),
                })
              })
              .then((listItemElement: Element) => {
                // assign data source to list element
                cy.updateElementProps({
                  elementId: listItemElement.id,
                  props: JSON.stringify({ dataSource: listDataSource }),
                })
              })
          },
        )

        // create test component with text prop = 'React Node"
        cy.createComponent({ name: reactNodeTextComponentName })
          .then(cy.getComponentRootElementId)
          .then((rootElementId: string) => {
            return cy.createElement({
              parentElementId: rootElementId,
              atomId: textAtomId,
            })
          })
          .then((textElement: CreateResponse) => {
            // create prop mapping from root to text
            // bind prop "value" to element "text"'s text prop key
            cy.updateElementProps({
              elementId: textElement.id,
              props: JSON.stringify(reactNodeTextProp),
            })
          })
        cy.getSpinner().should('not.exist')
      })
    })

    beforeEach(() => {
      cy.preserveAuthCookies()
    })

    it('bind  render props prop correctly', () => {
      cy.goToPageByAliasId()

      // Go to List component
      cy.findByText('Root element').click()
      cy.findByText(listElementName).click()

      // click on prop panel
      cy.findByText('Props').click()

      // Click on select renderItem which is render props type
      cy.findByLabelText(renderItemFieldName).click()
      cy.getOptionItem(listItemComponentName).first().click()
    })

    it('bind react node prop correctly', () => {
      cy.findByLabelText(headerFieldName).click()
      cy.getOptionItem(reactNodeTextComponentName).first().click()
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
