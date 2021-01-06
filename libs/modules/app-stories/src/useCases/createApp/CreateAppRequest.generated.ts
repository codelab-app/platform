import gql from 'graphql-tag'

export const CreateAppGql = gql`
  mutation CreateApp($input: CreateAppRequest!) {
    createApp(request: $input) {
      title
    }
  }
`
