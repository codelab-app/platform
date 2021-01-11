import gql from 'graphql-tag'

export const UpdateUserGql = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      email
    }
  }
`
