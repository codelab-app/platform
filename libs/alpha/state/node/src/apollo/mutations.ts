import { gql } from '@apollo/client'

export const NODE_CREATE = gql`
  mutation nodeCreate($type: String) {
    CreateNode(type: $type) {
      type
    }
  }
`
