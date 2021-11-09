import { CreateResponse, Element } from '@codelab/frontend/abstract/codegen'
import { AtomType, BaseTypeKind, TypeKind } from '@codelab/shared/abstract/core'

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
      cy.intercept('POST', '**/graphql').as('graphql')

      cy.resetDgraphData()

      cy.login().then(async () => {
        cy.preserveAuthCookies()

        cy.createType({
          name: BaseTypeKind.ReactNode,
          typeKind: TypeKind.ReactNodeType,
        }).then((renderPropType: CreateResponse) => {
          cy.wrap(renderPropType.id).as('reactNodeTypeId')
        })

        cy.createType({
          name: BaseTypeKind.RenderProps,
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
         *     - ListItem - Component
         *         - Text
         */
        cy.createAtom({
          name: 'ListItem',
          type: AtomType.AntDesignListItem,
        }).then((listItemAtom: CreateResponse) => {
          cy.createComponent({ name: listItemComponentName }).then(
            ({ id, name }) => {
              listItemRootElId = id

              return cy
                .createElement({
                  parentElementId: listItemRootElId,
                  atomId: listItemAtom.id,
                })
                .then((listItemElement) => {
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
            },
          )
        })

        /**
         * Create page
         * Create List component, attach to RootElement of the page
         *   - set dataSource to {value:string}[]
         */
        cy.createAtom({ name: 'List', type: AtomType.AntDesignList }).then(
          (listAtom) => {
            cy.get('@reactNodeTypeId').then((reactNodeTypeId) => {
              cy.createField({
                name: headerFieldName,
                key: 'header',
                interfaceId: listAtom.api.id,
                type: { existingTypeId: String(reactNodeTypeId) },
              })
            })

            cy.get('@renderPropTypeId').then((renderPropTypeId) => {
              // set render item field to render props type
              cy.createField({
                name: renderItemFieldName,
                key: 'renderItem',
                interfaceId: listAtom.api.id,
                type: { existingTypeId: String(renderPropTypeId) },
              })
            })

            cy.createPageFromScratch()
              .then((page) => {
                return cy
                  .getElementGraph({ where: { id: page.rootElementId } })
                  .then((elements) => {
                    const rootElement = elements?.vertices?.[0]

                    return cy
                      .createElement({
                        atomId: listAtom.id,
                        name: listElementName,
                        parentElementId: String(rootElement?.id),
                      })
                      .then((listItemElement: Element) => {
                        // assign data source to list element
                        cy.updateElementProps({
                          elementId: listItemElement.id,
                          props: JSON.stringify({ dataSource: listDataSource }),
                        })
                      })
                  })
              })
              .then(() => {
                // create test component with text prop = 'React Node"
                cy.createComponent({ name: reactNodeTextComponentName })
                  .then(({ id }) => {
                    return cy.createElement({
                      parentElementId: id,
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
                  .then(() => cy.goToPageByAliasId())
              })
          },
        )

        cy.getSpinner().should('not.exist')
      })
    })

    beforeEach(() => {
      cy.preserveAuthCookies()
    })

    it('bind  render props prop correctly', () => {
      // Go to List component
      cy.findByText('Root element').click()

      // For some reason it gets an element right before re-rendering and then causes an error for it being detached
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100)

      cy.findByText(listElementName).should('be.visible').click()

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
