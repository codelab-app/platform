import gql from 'graphql-tag'

export const UserLoginGql = gql`
  mutation UserLogin($input: LoginUserRequest!) {
    loginUser(request: $input) {
      email
      accessToken
    }
  }
`
