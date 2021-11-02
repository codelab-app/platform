import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestLambdaFragment = { id: string; name: string; body: string }

export const TestLambdaFragmentDoc = gql`
  fragment TestLambda on Lambda {
    id
    name
    body
  }
`
