import gql from 'graphql-tag'

export const MoveNodeGql = gql`
  mutation MoveNode($input: MoveNodeInput!) {
    moveNode(input: $input) {
      id
      label
      edges {
        order
        source
        target
        props
      }
    }
  }
`
