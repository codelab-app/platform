import { gql } from 'apollo-server-micro'

export const appSchema = gql`
  type App implements WithOwner {
    id: ID! @id(autogenerate: false)
    owner: User!
    name: String!
    slug: String!
    pages: [Page!]! @relationship(type: "PAGES", direction: OUT)
    store: Store! @relationship(type: "STORE_OF_APP", direction: IN)
    domains: [Domain!]! @relationship(type: "APP_DOMAIN", direction: IN)
  }

  extend type App
    @auth(
      rules: [
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
