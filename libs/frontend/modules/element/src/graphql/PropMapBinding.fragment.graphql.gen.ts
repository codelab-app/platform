import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type PropMapBindingFragment = {
  id: string
  sourceKey: string
  targetElementId?: string | null | undefined
  targetKey: string
}

export const PropMapBindingFragmentDoc = gql`
  fragment PropMapBinding on PropMapBinding {
    id
    sourceKey
    targetElementId
    targetKey
  }
`
