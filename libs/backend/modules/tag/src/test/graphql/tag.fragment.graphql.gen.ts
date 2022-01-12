import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestTagFragment = {
  __typename: 'Tag'
  id: string
  name: string
  isRoot: boolean
  children: Array<string>
  parent?: string | null | undefined
  owner?: { id: string } | null | undefined
}

export const TestTagFragmentDoc = gql`
  fragment TestTag on Tag {
    __typename
    id
    name
    isRoot
    children
    owner {
      id
    }
    parent
  }
`
