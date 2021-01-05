import gql from 'graphql-tag'

export const UserLogin = gql`
  mutation UserLogin($input: LoginUserRequest!) {
    loginUser(request: $input) {
      email
    }
  }
`
