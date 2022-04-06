import { Key } from 'react'
import { TagFragment } from '../graphql/Tag.fragment.v2.1.graphql.gen'

export interface KeyPayload {
  key: Key
}

export interface KeysPayload {
  keys: Array<Key>
}
