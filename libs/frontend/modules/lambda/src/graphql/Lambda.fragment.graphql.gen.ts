import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type LambdaFragment = { id: string; name: string; body: string }

export type LambdaPayloadFragment = { payload: string }

export const LambdaFragmentDoc = gql`
  fragment Lambda on Lambda {
    id
    name
    body
  }
`
export const LambdaPayloadFragmentDoc = gql`
  fragment LambdaPayload on LambdaPayload {
    payload
  }
`
