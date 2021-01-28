import gql from 'graphql-tag'

export const CreateGraphGql = gql`
  mutation CreateGraph($input: CreateGraphInput!) {
    createGraph(input: $input) {
      id
      label
    }
  }
`
