import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type TestInterfaceFragment = {
  __typename: 'InterfaceType'
  id: string
  name: string
}

export const TestInterfaceFragmentDoc = gql`
  fragment TestInterface on InterfaceType {
    __typename
    id
    name
  }
`
