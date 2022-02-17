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
    rootId: String
  }

  type Prop {
    id: ID! @id
    data: String! @default(value: "{}")
  }

  type Hook {
    id: ID! @id
    type: AtomType!
    config: Prop! @relationship(type: "CONFIG_OF_HOOK", direction: OUT)
  }

  type PropMapBinding {
    id: ID! @id
    targetElement: Element
      @relationship(type: "BIND_PROPS_TO_ELEMENT", direction: OUT)
    sourceKey: String! # Set to '*' to bind all incoming props
    targetKey: String! # Set to '*' to spread the incoming props to the outgoing ones
  }

  interface ParentOfElement @relationshipProperties {
    order: Int
  }

  type Element {
    id: ID! @id

    children: [Element!]
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

    instanceOfComponent: Element
      @relationship(type: "INSTANCE_OF_COMPONENT", direction: OUT)

    # Marks this element as a component
    componentTag: Tag
      @relationship(type: "COMPONENT_TAGGED_WITH", direction: OUT)

    atom: Atom @relationship(type: "RENDER_ATOM", direction: OUT)

    hooks: [Hook!] @relationship(type: "HOOKS_OF_ELEMENT", direction: OUT)
    propMapBindings: [PropMapBinding!]
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

  type Mutation {
    duplicateElement(
      input: DuplicateElementInput!
    ): DuplicateElementMutationResponse!
  }
`
