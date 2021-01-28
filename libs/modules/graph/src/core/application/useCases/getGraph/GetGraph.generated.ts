import gql from 'graphql-tag'

export const GetGraphGql = gql`
  query GetGraph($input: GetGraphInput!) {
    getGraph(input: $input) {
      id
      label
    }
  }
`
