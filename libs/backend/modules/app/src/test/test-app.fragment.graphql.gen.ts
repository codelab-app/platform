import * as Types from '@codelab/shared/codegen/graphql'

export type TestAppFragment = { id: string; name: string; ownerId: string }

export const TestAppFragmentDoc = gql`
  fragment TestApp on App {
    id
    name
    ownerId
  }
`
