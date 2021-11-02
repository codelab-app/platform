import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type ComponentTypeFragment = { id: string; name: string }

export const ComponentTypeFragmentDoc = gql`
  fragment ComponentType on ComponentType {
    id
    name
  }
`
