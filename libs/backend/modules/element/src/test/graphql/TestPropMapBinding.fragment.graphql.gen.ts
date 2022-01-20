import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from '@apollo/client'
export type TestPropMapBindingFragment = {
  id: string
  sourceKey: string
  targetElementId?: string | null | undefined
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
