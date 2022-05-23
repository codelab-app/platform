import { gql } from 'apollo-server-micro'

export const appSchema = gql`
  type App implements WithOwner {
    id: ID! @id(autogenerate: false)
    owner: User!
    name: String!
    pages: [Page!]! @relationship(type: "PAGES", direction: OUT)
    rootElement: Element! @relationship(type: "ROOT_APP_ELEMENT", direction: IN)
    store: Store @relationship(type: "STORE_OF_APP", direction: IN)
  }
  extend type App
    @auth(
      rules: [
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
`
