import { gql } from 'apollo-server-micro'

export const componentSchema = gql`
  type Component {
    id: ID! @id(autogenerate: false)
    name: String!
    rootElement: Element! @relationship(type: "COMPONENT_ROOT", direction: OUT)
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
  }

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
