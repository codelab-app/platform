import gql from 'graphql-tag'

export const RegisterUser = gql`
  mutation RegisterUser($input: RegisterUserRequest!) {
    registerUser(request: $input) {
      email
    }
  }
`
