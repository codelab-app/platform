import { gql } from '@apollo/client'
import { escapeDotPathKeys } from '@codelab/backend/shared/util'
import { JWT_CLAIMS } from '@codelab/shared/abstract/core'

const rolesPath = escapeDotPathKeys(`${JWT_CLAIMS}.roles`)

export const userSchema = gql`
  # https://neo4j.com/docs/graphql/current/authentication-and-authorization/configuration/
  # type JWT @jwt {
  #   roles: [String!]! @jwtClaim(path: "${rolesPath}")
  # }

  enum Role {
    User
    Admin
  }

  interface WithOwner {
    owner: User! @relationship(type: "OWNED_BY", direction: OUT)
  }

  type User {
    id: ID! @unique
    auth0Id: String! @unique
    email: String!
    username: String! @unique
    types: [IBaseType!]! @relationship(type: "OWNED_BY", direction: IN)
    apps: [App!]! @relationship(type: "OWNED_BY", direction: IN)
    elements: [Element!]! @relationship(type: "OWNED_BY", direction: IN)
    components: [Component!]! @relationship(type: "OWNED_BY", direction: IN)
    atoms: [Atom!]! @relationship(type: "OWNED_BY", direction: IN)
    # Some issue using required array of enum, can't add using []! signature
    # roles: [Role!] @default(value: User)
    roles: [Role!]
    tags: [Tag!]! @relationship(type: "OWNED_BY", direction: IN)
  }
`
