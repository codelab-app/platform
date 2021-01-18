import gql from 'graphql-tag'

export const EditAppGql = gql`
  mutation UpdateApp($input: UpdateAppInput!) {
    updateApp(input: $input) {
      id
      title
    }
  }
`
