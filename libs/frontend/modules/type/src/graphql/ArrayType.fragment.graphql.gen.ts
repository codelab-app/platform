import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from '@apollo/client'
export type ArrayTypeFragment = { id: string; name: string }

export const ArrayTypeFragmentDoc = gql`
  fragment ArrayType on ArrayType {
    id
    name
  }
`
