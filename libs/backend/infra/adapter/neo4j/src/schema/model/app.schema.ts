import { gql } from '@apollo/client'

export const appSchema = gql`
  type App implements WithOwner {
    id: ID! @unique
    owner: User!
    # auth0Id-name format to make it unique across user
    _compositeKey: String! @unique
    name: String! @customResolver(requires: "owner { id } _compositeKey ")
    slug: String! @customResolver(requires: "owner { id } _compositeKey")
    pages: [Page!]! @relationship(type: "PAGES", direction: OUT)
    domains: [Domain!]! @relationship(type: "APP_DOMAIN", direction: IN)
  }

  # extend type App
  #   # @authentication
  #   @authorization(
  #     validate: [{ where: { node: { owner: { id: "$jwt.sub" } } } }]
  #   )
`
