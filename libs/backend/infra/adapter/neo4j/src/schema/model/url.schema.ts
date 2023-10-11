import { gql } from '@apollo/client'

export const urlSchema = gql`
  type Url {
    id: ID! @unique
    url: String!
  }
`
