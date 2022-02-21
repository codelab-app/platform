import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
export type TagFragment = {
  id: string
  name: string
  isRoot?: boolean | null
  children?: Array<{ id: string; name: string } | null> | null
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
