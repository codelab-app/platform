import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { KeyPayload, KeysPayload, tagSlice } from '../store'

export const useTagDispatch = () => {
  const { actions } = tagSlice
  const dispatch = useDispatch()
  const curdDispatch = crudModalDispatchFactory(tagSlice.actions)()

  const setSelectedTag = useCallback(
    (payload: KeyPayload) => {
      dispatch(actions.selectTag(payload))
    },
    [dispatch],
  )

  const setCheckedTags = useCallback(
    (payload: KeysPayload) => {
      dispatch(actions.setCheckedTags(payload))
    },
    [dispatch],
  )

  const resetSelection = useCallback(
    (payload: KeysPayload) => {
      dispatch(actions.resetSelection())
    },
    [dispatch],
  )

  return {
    setCheckedTags,
    setSelectedTag,
    resetSelection,
    ...curdDispatch,
  }
}
