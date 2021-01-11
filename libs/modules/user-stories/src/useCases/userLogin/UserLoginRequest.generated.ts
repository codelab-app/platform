import gql from 'graphql-tag'

export const UserLoginGql = gql`
  mutation UserLogin($input: LoginUserInput!) {
    loginUser(input: $input) {
      email
      accessToken
    }
  }
`
