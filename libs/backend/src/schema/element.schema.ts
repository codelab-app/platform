import { gql } from 'apollo-server-micro'

export const elementSchema = gql`
  type ElementGraph @exclude {
    id: ID!
    descendants: [ID!]!
  }

  extend type Page
    @auth(
      rules: [
        {
          operations: [READ, CREATE, UPDATE]
          roles: ["User"]
          where: { app: { owner: { auth0Id: "$jwt.sub" } } }
          bind: { app: { owner: { auth0Id: "$jwt.sub" } } }
        }
        { operations: [READ, CREATE, UPDATE], roles: ["Admin"] }
      ]
    )

  interface ParentOfElement @relationshipProperties {
    order: Int
  }

  type Element {
    id: ID! @id(autogenerate: false)
    children: [Element!]!
      @relationship(
        type: "PARENT_OF_ELEMENT"
        properties: "ParentOfElement"
        direction: OUT
      )
    # Used for reverse lookup to see whether element is detached
    app: App @relationship(type: "ROOT_APP_ELEMENT", direction: OUT)
    # Used for reverse lookup to see whether element is detached
    page: Page @relationship(type: "ROOT_PAGE_ELEMENT", direction: IN)
    props: Prop @relationship(type: "PROPS_OF_ELEMENT", direction: OUT)
    parentElement: Element
      @relationship(
        type: "PARENT_OF_ELEMENT"
        properties: "ParentOfElement"
        direction: IN
      )
    # fixedId: String!, // This could be no longer needed with neo4j
    name: String
    customCss: String
    guiCss: String
    propTransformationJs: String
    renderForEachPropKey: String
    renderIfPropKey: String
    # component to render
    instanceOfComponent: Component
      @relationship(type: "INSTANCE_OF_COMPONENT", direction: OUT)

    # element is the rootElement for this component
    component: Component @relationship(type: "COMPONENT_ROOT", direction: IN)
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
