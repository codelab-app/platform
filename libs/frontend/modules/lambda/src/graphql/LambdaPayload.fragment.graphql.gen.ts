import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type LambdaPayloadFragment = { payload: string }

export const LambdaPayloadFragmentDoc = gql`
  fragment LambdaPayload on LambdaPayload {
    payload
  }
`
