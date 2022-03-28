import { CRUDModalState } from '@codelab/frontend/abstract/core'
import { Key } from 'react'
import { TagFragment } from '../graphql/Tag.fragment.v2.1.graphql.gen'

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
