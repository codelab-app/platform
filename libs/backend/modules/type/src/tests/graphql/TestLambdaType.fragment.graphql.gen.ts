import * as Types from '@codelab/shared/codegen/graphql'

export type TestLambdaTypeFragment = { id: string; name: string }

export const TestLambdaTypeFragmentDoc = gql`
  fragment TestLambdaType on LambdaType {
    id
    name
  }
`
