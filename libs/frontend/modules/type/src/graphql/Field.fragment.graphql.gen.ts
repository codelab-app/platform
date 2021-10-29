import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type FieldFragment = {
  id: string
  key: string
  name?: Types.Maybe<string>
  description?: Types.Maybe<string>
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
