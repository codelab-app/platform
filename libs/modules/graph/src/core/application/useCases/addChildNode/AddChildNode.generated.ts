import { gql } from '@apollo/client'

export const AddChildNodeGql = gql`
  mutation AddChildNode($input: AddChildNodeInput!) {
    addChildNode(input: $input) {
      label
      vertices {
        id
        type
        props
      }
      edges {
        id
        order
        source
        target
        props
      }
    }
  }
`
