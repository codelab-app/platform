import * as Types from '@codelab/shared/abstract/codegen'

import { OwnerFragment } from '../user/owner.fragment.tan.gen'
import { OwnerFragmentDoc } from '../user/owner.fragment.tan.gen'
export type TagFragment = {
  id: string
  name: string
  children: Array<{ id: string; name: string }>
  descendants: Array<{ id: string; name: string }>
  owner: OwnerFragment
  parent?: { id: string } | null
}

export type TagPreviewFragment = { id: string; name: string }

export const TagFragmentDoc = `
    fragment Tag on Tag {
  children {
    id
    name
  }
  descendants {
    id
    name
  }
  id
  name
  owner {
    ...Owner
  }
  parent {
    id
  }
}
    ${OwnerFragmentDoc}`
export const TagPreviewFragmentDoc = `
    fragment TagPreview on Tag {
  id
  name
}
    `
