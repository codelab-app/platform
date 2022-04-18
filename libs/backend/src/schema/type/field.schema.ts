import { gql } from 'apollo-server-micro'
import getFieldCypher from '../../repositories/type/getField.cypher'

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
    source: String!
    target: String!
  }

  """
  Concrete Field type implementation
  """
  type InterfaceTypeEdge implements Field @exclude {
    source: String!
    target: String!
    key: String!
    name: String
    description: String
  }

  type Mutation {
    upsertFieldEdge(
      input: UpsertFieldInput!
      isCreating: Boolean!
    ): InterfaceTypeEdge!
    deleteFieldEdge(input: DeleteFieldInput!): DeleteFieldResponse!
  }

  type Query {
    getField(interfaceId: ID!, key: String!): InterfaceTypeEdge!
        @cypher(statement: """${getFieldCypher}""")
  }
`
