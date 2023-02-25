import { gql } from 'apollo-server-micro'

export const adminSchema = gql`
  type ResetDatabaseMutationResponse {
    success: Boolean
  }

  type Mutation {
    # Delete all nodes except for the user
    resetDatabase: ResetDatabaseMutationResponse
      @cypher(
        statement: """
        MATCH (n)
        WHERE NOT n:User
        DETACH DELETE n
        RETURN { success:true }
        """
      )
  }
`
