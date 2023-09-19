import { gql } from '@apollo/client'

export const propSchema = gql`
  type Prop {
    id: ID! @unique
    data: String!
  }
`
