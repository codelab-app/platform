import { gql } from 'apollo-server-micro'

export const elementSchema = gql`
  type ElementEdge @exclude {
    source: String!
    target: String!
    order: Int
  }

  type ElementGraph @exclude {
    edges: [ElementEdge!]!
    vertices: [Element!]!
  }

  type Prop {
    id: ID! @id
    data: String! @default(value: "{}")
  }

  type Hook {
    id: ID! @id
    type: AtomType!
    config: Prop! @relationship(type: "CONFIG_OF_HOOK", direction: OUT)
    element: Element! @relationship(type: "HOOKS_OF_ELEMENT", direction: IN)
  }

  type PropMapBinding {
    id: ID! @id
    element: Element!
      @relationship(type: "BIND_PROPS_TO_ELEMENT", direction: IN)
    targetElement: Element @relationship(type: "BIND_TO_ELEMENT", direction: IN)
    sourceKey: String! # Set to '*' to bind all incoming props
    targetKey: String! # Set to '*' to spread the incoming props to the outgoing ones
  }

  interface ParentOfElement @relationshipProperties {
    order: Int
  }

  type Element {
    id: ID! @id

    children: [Element!]!
      @relationship(
        type: "PARENT_OF_ELEMENT"
        properties: "ParentOfElement"
        direction: OUT
      )

    props: Prop @relationship(type: "PROPS_OF_ELEMENT", direction: OUT)

    parentElement: Element
      @relationship(
        type: "PARENT_OF_ELEMENT"
        properties: "ParentOfElement"
        direction: IN
      )

    # fixedId: String!, // This could be no longer needed with neo4j
    name: String
    css: String
    propTransformationJs: String
    renderForEachPropKey: String
    renderIfPropKey: String

    # component to render
    instanceOfComponent: Component
      @relationship(type: "INSTANCE_OF_COMPONENT", direction: OUT)

    # element is the rootElement to which component
    component: Component @relationship(type: "COMPONENT_ROOT", direction: OUT)

    atom: Atom @relationship(type: "RENDER_ATOM", direction: OUT)

    hooks: [Hook!]! @relationship(type: "HOOKS_OF_ELEMENT", direction: OUT)

    propMapBindings: [PropMapBinding!]!
      @relationship(type: "BIND_PROPS_TO_ELEMENT", direction: OUT)
  }

  input ElementGraphInput {
    rootId: String!
  }

  type Query {
    elementGraph(input: ElementGraphInput!): ElementGraph!
  }

  input DuplicateElementInput {
    elementId: String!
  }

  type DuplicateElementMutationResponse @exclude {
    elements: [Element!]!
  }

  type DeleteElementsInfo @exclude {
    nodesDeleted: Int!
    relationshipsDeleted: Int!
    deletedIds: [String!]!
  }

  type Mutation {
    duplicateElement(
      input: DuplicateElementInput!
    ): DuplicateElementMutationResponse!

    deleteElementsSubgraph(
      delete: ElementDeleteInput
      where: ElementWhere
    ): DeleteElementsInfo!
  }
`
