import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type LambdaPayloadFragment = { payload: string }

export const LambdaPayloadFragmentDoc = gql`
  fragment LambdaPayload on LambdaPayload {
    payload
  }
`
