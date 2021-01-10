import gql from 'graphql-tag'

export const RegisterUserGql = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      email
      accessToken
    }
  }
`
