import { gql } from '@apollo/client'

export const propSchema = gql`
  type Prop @node {
    id: ID! @unique @settable(onUpdate: false)
    data: String!
  }
`
