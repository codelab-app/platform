import { gql } from 'apollo-server-micro'

export const adminSchema = gql`
  type ResetDatabaseMutationResponse {
    success: Boolean
  }

  input ExecuteCommandInput {
    command: String!
  }

  type ExecuteCommandResponse {
    success: Boolean!
    data: String!
  }

  type Mutation {
    resetDatabase: ResetDatabaseMutationResponse
      @cypher(
        statement: """
        MATCH (n) DETACH DELETE n { success:true }
        """
      )
    executeCommand(input: ExecuteCommandInput!): ExecuteCommandResponse!
  }
`
