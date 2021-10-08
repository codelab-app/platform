import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestLambdaTypeFragment = { id: string; name: string }

export const TestLambdaTypeFragmentDoc = gql`
  fragment TestLambdaType on LambdaType {
    id
    name
  }
`
