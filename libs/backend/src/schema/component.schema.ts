import { gql } from 'apollo-server-micro'
import getDescendantComponentIds from '../repositories/component/getDescendantComponentIds.cypher'

export const componentSchema = gql`
  type Component implements WithOwner {
    id: ID! @id(autogenerate: false)
    name: String!
    rootElement: Element! @relationship(type: "COMPONENT_ROOT", direction: OUT)
    api: InterfaceType! @relationship(type: "COMPONENT_API", direction: OUT)
    owner: User!
    descendantComponentIds: [ID!]! @cypher(statement: """${getDescendantComponentIds}""")
  }

  extend type Component
    @auth(
      rules: [
        { operations: [CONNECT, DISCONNECT, READ], roles: ["Admin", "User"] }
        {
          operations: [READ, UPDATE, CREATE, DELETE]
          roles: ["User"]
          where: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
        {
          operations: [READ, UPDATE, CREATE, DELETE]
          roles: ["Admin"]
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
      ]
    )

  #  extend type Component
  #    @auth(
  #      rules: [
  #        { operations: [READ, CONNECT, DISCONNECT], roles: ["Admin", "User"] }
  #        {
  #          operations: [READ, CREATE, UPDATE, DELETE]
  #          where: { owner: { auth0Id: "$jwt.sub" } }
  #          bind: { owner: { auth0Id: "$jwt.sub" } }
  #        }
  #      ]
  #    )
`
