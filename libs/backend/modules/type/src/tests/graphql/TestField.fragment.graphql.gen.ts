import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestFieldFragment = {
  id: string
  key: string
  name?: Types.Maybe<string>
  description?: Types.Maybe<string>
  source: string
  target: string
}

export const TestFieldFragmentDoc = gql`
  fragment TestField on Field {
    id
    key
    name
    description
    source
    target
  }
`
