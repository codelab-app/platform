import { gql } from 'apollo-server-micro'

export const propSchema = gql`
  type Prop {
    id: ID! @id
    data: String!
  }
`
