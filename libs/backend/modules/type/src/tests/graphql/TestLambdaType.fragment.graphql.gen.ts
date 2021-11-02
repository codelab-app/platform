import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type TestLambdaTypeFragment = { id: string; name: string }

export const TestLambdaTypeFragmentDoc = gql`
  fragment TestLambdaType on LambdaType {
    id
    name
  }
`
