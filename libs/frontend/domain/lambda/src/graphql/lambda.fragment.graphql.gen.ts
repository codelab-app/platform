import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from 'graphql-request'

export interface LambdaFragment {
  id: string
  name: string
  body: string
}

export interface LambdaPayloadFragment {
  payload: string
}

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
