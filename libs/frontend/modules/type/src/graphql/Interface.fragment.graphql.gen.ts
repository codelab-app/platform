import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type InterfaceFragment = {
  __typename: 'InterfaceType'
  id: string
  name: string
}

export const InterfaceFragmentDoc = gql`
  fragment Interface on InterfaceType {
    __typename
    id
    name
  }
`
