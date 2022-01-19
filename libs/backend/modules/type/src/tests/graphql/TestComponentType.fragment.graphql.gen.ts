import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from '@apollo/client'
export type TestComponentTypeFragment = { id: string; name: string }

export const TestComponentTypeFragmentDoc = gql`
  fragment TestComponentType on ComponentType {
    id
    name
  }
`
