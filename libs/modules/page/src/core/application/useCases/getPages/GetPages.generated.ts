import gql from 'graphql-tag'

export const GetPagesGql = gql`
  query GetPages($input: GetPagesInput!) {
    getPages(input: $input) {
      id
      title
    }
  }
`
