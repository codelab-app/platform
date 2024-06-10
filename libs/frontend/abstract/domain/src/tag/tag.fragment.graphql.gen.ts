import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
import { OwnerFragment } from '../user/owner.fragment.graphql.gen'
import { OwnerFragmentDoc } from '../user/owner.fragment.graphql.gen'
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
