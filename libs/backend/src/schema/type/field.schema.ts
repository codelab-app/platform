import { gql } from 'apollo-server-micro'

/**
 * 3 ways of representing GraphQL
 *
 * 1. SDL
 * 2. Introspection query result
 * 3. GraphQL.js object
 *
 * We want 2 -> 1
 */

export const fieldSchema = gql`
  interface Field @relationshipProperties {
    id: ID!
    key: String!
    name: String
    description: String
  }

  #  input UpsertFieldInput {
  #    # Current interface to add fields to
  #    interfaceTypeId: ID!
  #    # The target node
  #    fieldType: ID!
  #    key: String!
  #    name: String
  #    description: String
  #  }

  #      connect: InterfaceTypeFieldsConnectFieldInput!

  type Mutation {
    upsertField(where: InterfaceTypeWhere!): InterfaceTypeEdge!
  }
`
