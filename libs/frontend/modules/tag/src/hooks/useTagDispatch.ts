import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { useDispatch } from 'react-redux'
import { KeyPayload, KeysPayload, tagSlice } from '../store'

export const useTagDispatch = () => {
  const { actions } = tagSlice
  const dispatch = useDispatch()
  const curdDispatch = crudModalDispatchFactory(tagSlice.actions)()

  const setSelectedTag = (payload: KeyPayload) =>
    dispatch(actions.selectTag(payload))

  const setCheckedTags = (payload: KeysPayload) => {
    dispatch(actions.setCheckedTags(payload))
  }

  const resetSelection = (payload: KeysPayload) => {
    dispatch(actions.resetSelection())
  }

  return {
    setCheckedTags,
    setSelectedTag,
    resetSelection,
    ...curdDispatch,
  }
}
