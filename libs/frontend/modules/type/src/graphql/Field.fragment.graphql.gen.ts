import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type FieldFragment = {
  id: string
  key: string
  name?: string | null | undefined
  description?: string | null | undefined
  source: string
  target: string
}

export const FieldFragmentDoc = gql`
  fragment Field on Field {
    id
    key
    name
    description
    source
    target
  }
`
