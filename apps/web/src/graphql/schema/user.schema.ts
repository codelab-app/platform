import { gql } from 'apollo-server-micro'

export const userSchema = gql`
  type User @exclude(operations: [CREATE, UPDATE]) {
    id: ID! @id
    auth0Id: String!
    email: String!
    types: [TypeBase!]! @relationship(type: "OWNED_BY", direction: IN)
    apps: [App!]! @relationship(type: "OWNED_BY", direction: IN)
    components: [Component!]! @relationship(type: "OWNED_BY", direction: IN)
  }

  extend type User
    @auth(
      rules: [
        { operations: [CONNECT, DISCONNECT], bind: { auth0Id: "$jwt.sub" } }
      ]
    )
`
