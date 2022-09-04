import { gql } from 'apollo-server-micro'

export const adminSchema = gql`
  type ResetDatabaseMutationResponse {
    success: Boolean
  }

  input ExecuteCommandInput {
    command: String!
  }

  # This tells us what to do with the data on the frontend
  enum ExecuteCommandHandler {
    # Download the response string as a file
    Download

    # Don't do anything
    Void
  }

  type ExecuteCommandResponse {
    success: Boolean!
    data: String!
    handler: ExecuteCommandHandler!
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
