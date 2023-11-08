import { gql } from '@apollo/client'

export const elementSchema = gql`
  union ElementRenderType = Atom | Component
  union ContainerNode = Page | Component

  # __typename codegen is optional, making it difficult to use as discriminated union
  #enum NodeType {
  #
  #  }

  type Element {
    id: ID! @unique
    compositeKey: String! @unique
    name: String! @customResolver(requires: "id compositeKey")
    slug: String! @customResolver(requires: "id compositeKey")
    nextSibling: Element @relationship(type: "NODE_SIBLING", direction: IN)
    prevSibling: Element @relationship(type: "NODE_SIBLING", direction: OUT)
    firstChild: Element @relationship(type: "TREE_FIRST_CHILD", direction: IN)
    parentElement: Element
      @relationship(type: "TREE_FIRST_CHILD", direction: OUT)
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
    # one element E1 will have childMapperPropKey that points to a prop which has an array of values. for each on these values we render a component  childMapperComponent  as a child of E1 passing this value as prop for this component. because E1 will contain other children we need chose what is the rendering position of this array of components
    # so a pointer to the array of props for the components
    childMapperPropKey: String
    # The component that we will map over
    childMapperComponent: Component
      @relationship(type: "CHILD_MAPPER_COMPONENT", direction: OUT)
    # Where to put the mapped children
    # the position of mapped children relative to the other children of the same element
    # So the host element will contain manually created elements. we need to merge them with the mapped ones so we set their position
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
