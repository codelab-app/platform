import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestPropMapBindingFragment = {
  id: string
  sourceKey: string
  targetElementId?: Types.Maybe<string>
  targetKey: string
}

export const TestPropMapBindingFragmentDoc = gql`
  fragment TestPropMapBinding on PropMapBinding {
    id
    sourceKey
    targetElementId
    targetKey
  }
`
