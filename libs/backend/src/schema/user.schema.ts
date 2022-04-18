import { gql } from 'apollo-server-micro'

export const userSchema = gql`
  type User @exclude(operations: [CREATE, UPDATE]) {
    id: ID! @id
    auth0Id: String! @unique
    email: String!
    types: [TypeBase!]! @relationship(type: "OWNED_BY", direction: IN)
    apps: [App!]! @relationship(type: "OWNED_BY", direction: IN)
    components: [Component!]! @relationship(type: "OWNED_BY", direction: IN)
    tags: [Tag!]! @relationship(type: "OWNED_BY", direction: IN)
  }

  extend type User
    @auth(
      rules: [
        {
          operations: [READ]
          roles: ["User"]
          where: { auth0Id: "$jwt.sub" }
          bind: { auth0Id: "$jwt.sub" }
        }
        { operations: [READ], roles: ["Admin"] }
      ]
    )
`
