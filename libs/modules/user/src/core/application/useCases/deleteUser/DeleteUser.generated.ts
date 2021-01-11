import gql from 'graphql-tag'

export const DeleteUserGql = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      id
      email
    }
  }
`
