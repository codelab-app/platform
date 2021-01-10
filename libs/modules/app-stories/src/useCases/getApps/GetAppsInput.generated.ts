import gql from 'graphql-tag'

export const GetAppsGql = gql`
  query GetApps {
    getApps {
      id
      title
    }
  }
`
