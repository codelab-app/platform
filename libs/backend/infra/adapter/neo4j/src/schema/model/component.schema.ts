import { gql } from 'apollo-server-micro'

export const componentSchema = gql`
  type Query {
    pageComponents(pageId: ID!): [Component!]!
  }

  type Component implements WithOwner {
    id: ID! @id(autogenerate: false)
    name: String!
    rootElement: Element! @relationship(type: "COMPONENT_ROOT", direction: OUT)
    api: InterfaceType! @relationship(type: "COMPONENT_API", direction: OUT)
    owner: User!
    store: Store! @relationship(type: "STORE_OF_COMPONENT", direction: IN)
    props: Prop! @relationship(type: "PROPS_OF_COMPONENT", direction: OUT)

    # Function to extract a unique key from component input
    keyGenerator: String

    # This is the slot where prop children is rendered in the component instance
    # We may want multiple slots in the future
    childrenContainerElement: Element!
      @relationship(type: "CHILDREN_CONTAINER_ELEMENT", direction: OUT)
  }

  extend type Component
    @auth(
      rules: [
        { operations: [CONNECT, DISCONNECT], roles: ["Admin", "User"] }
        {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["User"]
          where: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
        {
          operations: [UPDATE, CREATE, DELETE]
          roles: ["Admin"]
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
      ]
    )
`
