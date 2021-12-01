import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type PropFragment = { id: string; data: string }

export const PropFragmentDoc = gql`
  fragment Prop on Prop {
    id
    data
  }
`
