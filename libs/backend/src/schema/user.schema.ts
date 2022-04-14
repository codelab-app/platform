import { gql } from 'apollo-server-micro'

export const userSchema = gql`
  enum Role {
    User
    Admin
  }

  type User @exclude(operations: [UPDATE]) {
    id: ID! @id
    auth0Id: String! @unique
    email: String!
    types: [TypeBase!]! @relationship(type: "OWNED_BY", direction: IN)
    apps: [App!]! @relationship(type: "OWNED_BY", direction: IN)
    components: [Component!]! @relationship(type: "OWNED_BY", direction: IN)
    roles: [Role!]
    tags: [Tag!]! @relationship(type: "OWNED_BY", direction: IN)
  }

  extend type User
    @auth(
      rules: [
        {
          operations: [READ]
          roles: ["User", "Guest"]
          where: { auth0Id: "$jwt.sub" }
          bind: { auth0Id: "$jwt.sub" }
        }
        { operations: [READ], roles: ["Admin"] }
      ]
    )
`
