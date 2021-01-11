import gql from 'graphql-tag'

export const GetMeGql = gql`
  query GetMe {
    getMe {
      id
      email
    }
  }
`
