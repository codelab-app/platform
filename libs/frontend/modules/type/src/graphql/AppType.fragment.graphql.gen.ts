import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type AppTypeFragment = { id: string; name: string }

export const AppTypeFragmentDoc = gql`
  fragment AppType on LambdaType {
    id
    name
  }
`
