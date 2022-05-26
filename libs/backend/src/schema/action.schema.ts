import { gql } from 'graphql-request'

export const actionSchema = gql`
  type Action {
    id: ID! @id
    name: String!
    body: String!
    store: Store! @relationship(type: "STORE_ACTION", direction: IN)
  }
`
