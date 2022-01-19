import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from '@apollo/client'
export type TestLambdaTypeFragment = { id: string; name: string }

export const TestLambdaTypeFragmentDoc = gql`
  fragment TestLambdaType on LambdaType {
    id
    name
  }
`
