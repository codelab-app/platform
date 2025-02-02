import { gql } from '@apollo/client'

export const authGuardSchema = gql`
  type AuthGuard implements WithOwner @node {
    id: ID! @settable(onUpdate: false) #@unique
    name: String!
    resource: Resource!
      @relationship(type: "RESOURCE_OF_AUTH_GUARD", direction: OUT)
    config: Prop! @relationship(type: "AUTH_GUARD_CONFIG", direction: OUT)
    responseTransformer: String!
    # redirect to another page inside the app or to a given url
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
  }
`
