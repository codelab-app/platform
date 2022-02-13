import { gql } from 'apollo-server-micro'

export const adminSchema = gql`
  type ResetDataMutationResponse
    @exclude(operations: [CREATE, READ, UPDATE, DELETE]) {
    success: Boolean
  }

  type Mutation {
    resetData: ResetDataMutationResponse
  }
`
