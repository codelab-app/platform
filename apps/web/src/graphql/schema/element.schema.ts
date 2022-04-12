import { gql } from 'apollo-server-micro'

export const elementSchema = gql`
  type ElementGraph @exclude {
    descendants: [ID!]!
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
`
