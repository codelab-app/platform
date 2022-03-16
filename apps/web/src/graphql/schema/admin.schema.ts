import { gql } from 'apollo-server-micro'

export const adminSchema = gql`
  type ResetDatabaseMutationResponse {
    success: Boolean
  }

  type Mutation {
    resetDatabase: ResetDatabaseMutationResponse
  }

  type ImportDataMutationResponse {
    result: Boolean!
  }

  input ImportAdminDataInput {
    payload: [JSONObject!]
  }

  type Mutation {
    importAdminData(input: ImportAdminDataInput!): ImportDataMutationResponse
  }

  type Query {
    exportAllTypesGraph: JSONObject
  }
`
