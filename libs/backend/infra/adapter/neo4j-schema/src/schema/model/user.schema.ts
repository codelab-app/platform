import { gql } from '@apollo/client'
import { escapeDotPathKeys } from '@codelab/backend/shared/util'
import { JWT_CLAIMS } from '@codelab/shared/abstract/core'

const rolesPath = escapeDotPathKeys(`${JWT_CLAIMS}.roles`)

/**
 * Validation auth rule to allow read access for regular authenticated user
 */
export const allowReadAccess = `
{
  operations: [READ],
  where: {}
}`

/**
 * Validation auth rule to allow full access for Admin users
 */
export const allowFullAccessForAdmin = `
{
  operations: [READ, UPDATE, CREATE, DELETE],
  where: { jwt: { roles_INCLUDES: "Admin" } }
}`

/**
 * Auth rule to allow full access for Admin users
 */
export const allowFullAccessForOwner = `
{
  operations: [UPDATE, CREATE, DELETE],
  where: { node: { owner: { auth0Id: "$jwt.sub" } } }
}
`

/**
 * Authorization rule to allow Read access for regular users, and full access for Admin and Owner
 */
// export const authOwnerOrAdmin = `
//   @authorization(
//     validate: [
//       ${allowReadAccess}
//       ${allowFullAccessForAdmin}
//       ${allowFullAccessForOwner}
//     ]
//   )
// `

export const authOwnerOrAdmin = ''

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

  type User @node {
    id: ID!  @settable(onUpdate: false) #@unique
    auth0Id: String!  #@unique
    email: String! #@unique
    username: String! #@unique
    types: [IBaseType!]! @relationship(type: "OWNED_BY", direction: IN)
    apps: [App!]! @relationship(type: "OWNED_BY", direction: IN)
    elements: [Element!]! @relationship(type: "OWNED_BY", direction: IN)
    components: [Component!]! @relationship(type: "OWNED_BY", direction: IN)
    atoms: [Atom!]! @relationship(type: "OWNED_BY", direction: IN)
    # Some issue using required array of enum, can't add using []! signature
    # roles: [Role!] @default(value: User)
    roles: [Role!]
    tags: [Tag!]! @relationship(type: "OWNED_BY", direction: IN)
    preferences: Preference! @relationship(type: "OWNED_BY", direction: IN)
    name: String!
    picture: String!
  }
`
