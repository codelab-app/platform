import { gql } from '@apollo/client'
import * as Types from '@codelab/shared/abstract/codegen'

export type TestLambdaPayloadFragment = { payload: string }

export const TestLambdaPayloadFragmentDoc = gql`
  fragment TestLambdaPayload on LambdaPayload {
    payload
  }
`
