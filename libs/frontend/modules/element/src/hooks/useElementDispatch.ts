import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { elementSlice, SetCurrentGraphRootActionPayload } from '../store'

export const useElementDispatch = () => {
  const dispatch = useDispatch()
  const { setCurrentGraphRootId } = elementSlice.actions
  const crudDispatch = crudModalDispatchFactory(elementSlice.actions)()

  const setCurrentGraphRoot = useCallback(
    (payload: SetCurrentGraphRootActionPayload) => {
      dispatch(setCurrentGraphRootId(payload))
    },
    [dispatch, setCurrentGraphRootId],
  )

  return {
    setCurrentGraphRoot,
    ...crudDispatch,
  }
}
