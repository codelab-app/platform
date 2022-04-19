import { gql } from 'apollo-server-micro'

export const fieldSchema = gql`
  interface Field @relationshipProperties {
    id: ID!
    key: String!
    name: String
    description: String
  }
`
