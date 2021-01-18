import gql from 'graphql-tag'

export const UpdateAppGql = gql`
  mutation UpdateApp($input: UpdateAppInput!) {
    updateApp(input: $input) {
      id
      title
    }
  }
`
