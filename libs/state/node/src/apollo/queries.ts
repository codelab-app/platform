import { gql } from '@apollo/client'

export const NODES = gql`
  query nodes {
    Node {
      id
      type
    }
  }
`

export const NODE_DETAIL = gql`
  query nodeDetail {
    Node {
      id
      type
    }
  }
`
