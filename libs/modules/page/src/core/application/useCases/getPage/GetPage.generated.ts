import gql from 'graphql-tag'

export const GetPageGql = gql`
  query GetPage($input: GetPageInput!) {
    getPage(input: $input) {
      title
    }
  }
`
