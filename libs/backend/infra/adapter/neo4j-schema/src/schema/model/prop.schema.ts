import { gql } from '@apollo/client'

export const propSchema = gql`
  type Prop @node {
    id: ID! @settable(onUpdate: false) #@unique
    data: String!
  }
`
