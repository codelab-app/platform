import { gql } from '@apollo/client'

export const elementSchema = gql`
  union ElementRenderType = Atom | Component
  union ContainerNode = Page | Component

  type Element {
    id: ID! @unique
    compositeKey: String! @unique
    name: String! @customResolver(requires: "id compositeKey")
    slug: String! @customResolver(requires: "id compositeKey")
    nextSibling: Element @relationship(type: "NODE_SIBLING", direction: IN)
    prevSibling: Element @relationship(type: "NODE_SIBLING", direction: OUT)
    firstChild: Element @relationship(type: "TREE_FIRST_CHILD", direction: IN)
    parent: Element @relationship(type: "TREE_FIRST_CHILD", direction: OUT)
    # Used for reverse lookup to see whether element is detached
    page: Page @relationship(type: "ROOT_PAGE_ELEMENT", direction: IN)
    props: Prop! @relationship(type: "PROPS_OF_ELEMENT", direction: OUT)

    # element is the rootElement for this component
    parentComponent: Component
      @relationship(type: "COMPONENT_ROOT", direction: IN)
    # Used for the css set by the styling UI and manually. This is a stringified json object
    # that contains styles for different screen size breakpoints.
    # See interface for more details: IElementStyle
    style: String
    tailwindClassNames: [String!]
    childMapperPropKey: String
    childMapperComponent: Component
      @relationship(type: "CHILD_MAPPER_COMPONENT", direction: OUT)
    childMapperPreviousSibling: Element
      @relationship(type: "CHILD_MAPPER_PREVIOUS_SIBLING", direction: IN)
    renderForEachPropKey: String
    renderIfExpression: String

    preRenderAction: BaseAction
      @relationship(type: "PRE_RENDER_ELEMENT_ACTION", direction: OUT)
    postRenderAction: BaseAction
      @relationship(type: "POST_RENDER_ELEMENT_ACTION", direction: OUT)
    renderType: ElementRenderType!
      # There is bug for union type, need to use custom query
      # https://github.com/neo4j/graphql/issues/487
      @relationship(type: "ELEMENT_RENDER_TYPE", direction: OUT)
    # This is a custom field resolver
    descendantElements: [Element!]!
    closestContainerNode: ContainerNode!
  }
`
