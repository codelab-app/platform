import { gql } from 'apollo-server-micro'

export const adminSchema = gql`
  type ResetDatabaseMutationResponse {
    success: Boolean
  }

  type ImportDataMutationResponse {
    success: Boolean!
  }

  input ImportAdminDataInput {
    payload: JSONObject!
  }

  type Mutation {
    resetDatabase: ResetDatabaseMutationResponse
      @cypher(
        statement: """
        MATCH (n) DETACH DELETE n RETURN { success:true }
        """
      )
    importAdminData(input: ImportAdminDataInput!): ImportDataMutationResponse
  }

  type ExportAdminDataResponse {
    result: JSONObject!
  }

  type Query {
    exportAdminData: ExportAdminDataResponse!
  }
`
