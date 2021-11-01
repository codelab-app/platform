import * as Types from '@codelab/shared/codegen/graphql'

export type LambdaTypeFragment = { id: string; name: string }

export const LambdaTypeFragmentDoc = gql`
  fragment LambdaType on LambdaType {
    id
    name
  }
`
