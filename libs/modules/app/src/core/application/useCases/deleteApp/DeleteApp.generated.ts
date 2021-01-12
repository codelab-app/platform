import gql from 'graphql-tag'

export const DeleteAppGql = gql`
  mutation DeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input) {
      id
      title
    }
  }
`
