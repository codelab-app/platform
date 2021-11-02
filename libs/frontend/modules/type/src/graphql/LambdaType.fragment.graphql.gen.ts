import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type LambdaTypeFragment = { id: string; name: string }

export const LambdaTypeFragmentDoc = gql`
  fragment LambdaType on LambdaType {
    id
    name
  }
`
