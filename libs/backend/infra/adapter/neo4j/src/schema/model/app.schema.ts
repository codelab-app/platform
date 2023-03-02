import { gql } from 'apollo-server-micro'

export const appSchema = gql`
  type App implements WithOwner {
    id: ID! @id(autogenerate: false)
    owner: User!
    _compoundName: String! @unique
    name: String! @computed(from: ["id", "_compoundName"])
    slug: String! @computed(from: ["id", "_compoundName"])
    pages: [Page!]! @relationship(type: "PAGES", direction: OUT)
    store: Store! @relationship(type: "STORE_OF_APP", direction: IN)
    domains: [Domain!]! @relationship(type: "APP_DOMAIN", direction: IN)
  }

  extend type App
    @auth(
      rules: [
        {
          operations: [CREATE, UPDATE, DELETE]
          roles: ["User"]
          where: { owner: { auth0Id: "$jwt.sub" } }
          allow: { owner: { auth0Id: "$jwt.sub" } }
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
        {
          operations: [CREATE, UPDATE, DELETE]
          roles: ["Admin"]
          bind: { owner: { auth0Id: "$jwt.sub" } }
        }
      ]
    )
`
