import gql from 'graphql-tag'

export const GetPagesGql = gql`
  query GetPagesQuery {
    getMe {
      email
    }
  }
`
