import gql from 'graphql-tag'

export const GetAppGql = gql`
  query GetApp($input: GetAppInput!) {
    getApp(input: $input) {
      title
    }
  }
`
