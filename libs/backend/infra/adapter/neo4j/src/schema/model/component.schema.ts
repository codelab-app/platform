import { gql } from 'apollo-server-micro'
import { getDescendantComponentIds } from '../../cypher'

export const componentSchema = gql`
  type Component implements WithOwner {
    id: ID! @id(autogenerate: false)
    name: String!
    rootElement: Element! @relationship(type: "COMPONENT_ROOT", direction: OUT)
    api: InterfaceType! @relationship(type: "COMPONENT_API", direction: OUT)
    owner: User!
    props: Prop @relationship(type: "PROPS_OF_COMPONENT", direction: OUT)
    # This is used to prevent components from referencing each other in a
    # circular way. In another words, if component A references component B,
    # component B cannot reference component A because that would cause
    # infinite recursion in the renderer.
    # Note: A component referencing another component means the first component
    # has an element that is an instance of the second component.
    descendantComponentIds: [ID!]! @cypher(statement: """${getDescendantComponentIds}""")
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
