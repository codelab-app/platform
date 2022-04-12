import { gql } from 'apollo-server-micro'

export const fieldSchema = gql`
  input UpsertFieldInput {
    interfaceTypeId: ID!
    targetTypeId: ID!
    # This is the original key of the field you want to update. Applicable only for update.
    targetKey: String
    # This is the new, updated key
    key: String!
    name: String
    description: String
  }

  input DeleteFieldInput {
    interfaceId: ID!
    key: String!
  }

  type DeleteFieldResponse {
    deletedEdgesCount: Int!
  }

  interface Field @relationshipProperties {
    key: String!
    name: String
    description: String
  }
`
