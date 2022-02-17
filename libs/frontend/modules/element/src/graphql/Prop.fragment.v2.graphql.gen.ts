import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
export type PropFragment = { id: string; data: string }

export const PropFragmentDoc = gql`
  fragment Prop on Prop {
    id
    data
  }
`
