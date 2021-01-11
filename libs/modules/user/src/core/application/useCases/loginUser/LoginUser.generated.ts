import gql from 'graphql-tag'

export const LoginUserGql = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      email
      accessToken
    }
  }
`
