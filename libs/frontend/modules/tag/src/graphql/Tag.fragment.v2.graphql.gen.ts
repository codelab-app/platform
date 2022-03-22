import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from 'graphql-request'
export type TagFragment = {
  id: string
  name: string
  isRoot?: boolean | null | undefined
  children: Array<{ id: string; name: string }>
}

export const TagFragmentDoc = gql`
  fragment Tag on Tag {
    id
    name
    isRoot
    children {
      id
      name
    }
  }
`
