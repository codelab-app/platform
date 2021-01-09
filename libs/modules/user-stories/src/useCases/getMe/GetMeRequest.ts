import gql from 'graphql-tag'

export const GetMeGql = gql`
  query GetMeQuery {
    getMe {
      email
    }
  }
`
