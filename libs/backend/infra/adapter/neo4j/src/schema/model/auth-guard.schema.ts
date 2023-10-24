import { gql } from '@apollo/client'

export const authGuardSchema = gql`
  type AuthGuard implements WithOwner {
    id: ID! @unique
    name: String!
    resource: Resource!
      @relationship(type: "RESOURCE_OF_AUTH_GUARD", direction: OUT)

    config: Prop! @relationship(type: "AUTH_GUARD_CONFIG", direction: OUT)

    responseTransformer: String!

    owner: User!
  }
`
