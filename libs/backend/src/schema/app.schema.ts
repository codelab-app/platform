import { gql } from 'apollo-server-micro'

export const appSchema = gql`
  type App implements WithOwner {
    id: ID! @id(autogenerate: false)
    owner: User!
    name: String!
    pages: [Page!]! @relationship(type: "PAGES", direction: IN)
    rootProviderElement: Element!
      @relationship(type: "PROVIDER_ROOT", direction: IN)
    # Used to hold all detached elements, use this instead of array to match tree structure
    # This element type itself is actually invalid
    rootDetachedElement: Element!
      @relationship(type: "DETACHED_ELEMENTS", direction: IN)
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
