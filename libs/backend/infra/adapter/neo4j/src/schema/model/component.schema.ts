import { gql } from 'apollo-server-micro'

export const componentSchema = gql`
  type Component implements WithOwner {
    id: ID! @id(autogenerate: false)
    name: String!
    rootElement: Element! @relationship(type: "COMPONENT_ROOT", direction: OUT)
    api: InterfaceType! @relationship(type: "COMPONENT_API", direction: OUT)
    owner: User!

    store: Store! @relationship(type: "STORE_OF_COMPONENT", direction: IN)

    props: Prop! @relationship(type: "PROPS_OF_COMPONENT", direction: OUT)
    # This is the element inside the component that is going to be
    # the container for component instance children
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
