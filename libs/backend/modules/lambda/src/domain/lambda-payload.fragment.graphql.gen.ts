import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestLambdaPayloadFragment = { payload: string }

export const TestLambdaPayloadFragmentDoc = gql`
  fragment TestLambdaPayload on LambdaPayload {
    payload
  }
`
