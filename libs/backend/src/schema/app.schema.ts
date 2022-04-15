import { gql } from 'apollo-server-micro'

export const appSchema = gql`
  type App {
    id: ID! @id
    owner: [User!]! @relationship(type: "OWNED_BY", direction: OUT)
    name: String!
    pages: [Page!]! @relationship(type: "PAGES", direction: IN)
    rootProviderElement: Element! @relationship(type: "ROOT", direction: IN)
    store: Store @relationship(type: "STORE_OF_APP", direction: IN)
  }

  extend type App
    @auth(
      rules: [
        {
          operations: [READ, UPDATE, CREATE, DELETE]
          roles: ["User", "Guest"]
          where: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
        { operations: [READ, UPDATE, CREATE, DELETE], roles: ["Admin"] }
      ]
    )
`
