import { gql } from '@apollo/client'

export const appSchema = gql`
  type App implements WithOwner {
    id: ID! @id(autogenerate: false)
    owner: User!
    # auth0Id-name format to make it unique across user
    _compoundName: String! @unique
    name: String! @customResolver(requires: ["id", "_compoundName"])
    slug: String! @customResolver(requires: ["id", "_compoundName"])
    pages: [Page!]! @relationship(type: "PAGES", direction: OUT)
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
