import { CRUDModalState } from '@codelab/frontend/view/components'
import { Key } from 'react'
import { TagFragment } from '../graphql/Tag.fragment.graphql.gen'

export interface TagState extends CRUDModalState<TagFragment> {
  selectedTag?: Key
  checkedTags: Array<Key>
}

export interface KeyPayload {
  key: Key
}

export interface KeysPayload {
  keys: Array<Key>
}
