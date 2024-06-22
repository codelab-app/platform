import { gql } from '@apollo/client'
import { escapeDotPathKeys } from '@codelab/backend/shared/util'
import { JWT_CLAIMS } from '@codelab/shared/abstract/core'

const rolesPath = `${escapeDotPathKeys(JWT_CLAIMS)}.roles`

/**
 * Forbid all mutations if user is not Admin
 */
export const restrictMutationsToAdminOnly = `
{
  operations: [CREATE, UPDATE, DELETE, CREATE_RELATIONSHIP, DELETE_RELATIONSHIP],
  where: { jwt: { roles_INCLUDES: "Admin" } }
}`

/**
 * Forbid all mutations if user is not the owner of data
 */
export const restrictMutationsToOwnerOnly = `
{
  operations: [CREATE, UPDATE, DELETE, CREATE_RELATIONSHIP, DELETE_RELATIONSHIP],
  where: { node: { owner: { auth0Id: "$jwt.sub" } } }
}
`

/**
 * Authorization rule to disable mutations if user is not Admin or data owner
 * "Get" access is granted without authentication, since anonymous users
 * need READ access to see deployed Apps in production
 */
export const authOwnerOrAdmin = `
  @authorization(
    validate: [
      ${restrictMutationsToAdminOnly}
      ${restrictMutationsToOwnerOnly}
    ]
  )
`

export const userSchema = gql`
  # https://neo4j.com/docs/graphql/current/authentication-and-authorization/configuration/
  type JWT @jwt {
    roles: [String!]! @jwtClaim(path: "${rolesPath}")
  }

  enum Role {
    User
    Admin
  }

  interface WithOwner {
    owner: User! @declareRelationship
  }

  type User {
    id: ID! @unique
    auth0Id: String! @unique
    email: String! @unique
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
    preferences: String
  }
`
