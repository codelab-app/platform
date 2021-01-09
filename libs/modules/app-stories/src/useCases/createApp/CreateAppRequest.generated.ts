import gql from 'graphql-tag'

export const CreateAppGql = gql`
  mutation CreateApp($request: CreateAppRequest!) {
    createApp(request: $request) {
      title
    }
  }
`
