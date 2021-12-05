import {
  createCrudSlice,
  CRUDModalState,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { PayloadAction } from '@reduxjs/toolkit'
import { Key } from 'react'
import { DefaultRootState } from 'react-redux'
import { TagFragment } from '../graphql/Tag.fragment.graphql.gen'

export interface TagState extends CRUDModalState<TagFragment> {
  selectedTag?: Key
  checkedTags: Array<Key>
}

const initialState: TagState = {
  ...initialCrudState,
  checkedTags: [],
  selectedTag: undefined,
}

export interface KeyPayload {
  key: Key
}

export interface KeysPayload {
  keys: Array<Key>
}

export const tagSlice = createCrudSlice('tag', initialState, {
  selectTag: (state, action: PayloadAction<KeyPayload>) => {
    state.selectedTag = action.payload.key
  },
  setCheckedTags: (state, action: PayloadAction<KeysPayload>) => {
    state.checkedTags = action.payload.keys
  },
  resetSelection: (state) => {
    state.selectedTag = undefined
    state.checkedTags = []
  },
})

export const tagActions = tagSlice.actions
export const tagReducer = tagSlice.reducer

export const selectTag = (rootState: DefaultRootState) => rootState.tag
