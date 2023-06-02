import { gql } from '@apollo/client'

export const adminSchema = gql`
  type ResetDatabaseMutationResponse @exclude {
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
