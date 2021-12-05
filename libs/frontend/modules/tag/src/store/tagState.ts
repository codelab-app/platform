import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { PayloadAction } from '@reduxjs/toolkit'
import { KeyPayload, KeysPayload, TagState } from './types'

const initialState: TagState = {
  ...initialCrudState,
  checkedTags: [],
  selectedTag: undefined,
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
