import { gql } from '@apollo/client'

import { authOwnerOrAdmin } from './user.schema'

export const appSchema = gql`
  type App implements WithOwner ${authOwnerOrAdmin} {
    id: ID! @unique @settable(onUpdate: false)
    owner: User!
    # userId-name format to make it unique across user
    compositeKey: String! @unique
    name: String! @customResolver(requires: "owner { id } compositeKey ")
    slug: String! @customResolver(requires: "owner { id } compositeKey")
    pages: [Page!]! @relationship(type: "PAGES", direction: OUT)
    domains: [Domain!]! @relationship(type: "APP_DOMAIN", direction: IN)
  }
`
