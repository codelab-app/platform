import gql from 'graphql-tag'

export const UpdateNodeGql = gql`
  mutation UpdateNode($input: UpdateNodeInput!) {
    updateNode(input: $input) {
      label
      vertices {
        id
        type
        props
      }
    }
  }
`
