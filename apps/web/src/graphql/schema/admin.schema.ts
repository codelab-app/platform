import { gql } from 'apollo-server-micro'

export const adminSchema = gql`
  type ResetDataMutationResponse {
    success: Boolean
  }

  type Mutation {
    resetData: ResetDataMutationResponse
  }
`
