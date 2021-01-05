import gql from 'graphql-tag'

export const RegisterUserGql = gql`
  mutation RegisterUser($input: RegisterUserRequest!) {
    registerUser(request: $input) {
      email
    }
  }
`
