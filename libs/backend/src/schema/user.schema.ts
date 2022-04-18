import { gql } from 'apollo-server-micro'

export const userSchema = gql`
  enum Role {
    User
    Admin
  }

  type User @exclude(operations: [CREATE, UPDATE]) {
    id: ID! @id
    auth0Id: String! @unique
    email: String!
    types: [TypeBase!]! @relationship(type: "OWNED_BY", direction: IN)
    apps: [App!]! @relationship(type: "OWNED_BY", direction: IN)
    components: [Component!]! @relationship(type: "OWNED_BY", direction: IN)
    roles: [Role!]
  }

  extend type User
    @auth(
      rules: [
        { operations: [CONNECT, DISCONNECT], bind: { auth0Id: "$jwt.sub" } }
      ]
    )
`
