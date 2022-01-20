import { gql } from '@apollo/client'
import * as Types from '@codelab/shared/abstract/codegen'

export type TestLambdaFragment = { id: string; name: string; body: string }

export const TestLambdaFragmentDoc = gql`
  fragment TestLambda on Lambda {
    id
    name
    body
  }
`
