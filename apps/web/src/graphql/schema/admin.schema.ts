import { gql } from 'apollo-server-micro'

export const adminSchema = gql`
  type ResetDatabaseMutationResponse {
    success: Boolean
  }

  type Mutation {
    resetDatabase: ResetDatabaseMutationResponse
  }
`
