import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type TestTagFragment = {
  __typename: 'Tag'
  id: string
  name: string
  isRoot: boolean
  children: Array<string>
}

export const TestTagFragmentDoc = gql`
  fragment TestTag on Tag {
    __typename
    id
    name
    isRoot
    children
  }
`
