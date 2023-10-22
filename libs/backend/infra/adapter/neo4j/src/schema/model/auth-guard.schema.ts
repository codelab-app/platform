import { gql } from '@apollo/client'

export const authGuardSchema = gql`
  union Redirect = Page | Url

  type AuthGuard implements WithOwner {
    id: ID! @unique
    name: String!
    resource: Resource!
      @relationship(type: "RESOURCE_OF_AUTH_GUARD", direction: OUT)
    # page using this auth guard
    pages: [Page!]! @relationship(type: "PAGE_AUTH_GUARD", direction: IN)

    config: Prop! @relationship(type: "AUTH_GUARD_CONFIG", direction: OUT)

    responseTransformer: String!

    redirect: Redirect!
      @relationship(type: "AUTH_GUARD_REDIRECT", direction: OUT)

    # redirect to another page inside the app or to a given url
    owner: User!
  }
`
