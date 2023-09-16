import { gql } from '@apollo/client'

export const appSchema = gql`
  type App implements WithOwner {
    id: ID! @unique
    owner: User!
    # auth0Id-name format to make it unique across user
    compositeKey: String! @unique
    name: String! @customResolver(requires: "owner { id } compositeKey ")
    slug: String! @customResolver(requires: "owner { id } compositeKey")
    pages: [Page!]! @relationship(type: "PAGES", direction: OUT)
    domains: [Domain!]! @relationship(type: "APP_DOMAIN", direction: IN)
  }

  # extend type App
  #   # @authentication
  #   @authorization(
  #     validate: [{ where: { node: { owner: { id: "$jwt.sub" } } } }]
  #   )
`
