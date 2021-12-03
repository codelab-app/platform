import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { useDispatch } from 'react-redux'
import { hookSlice, SetSelectedTypeAction } from '../store'

export const useHookDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = hookSlice
  const curdDispatch = crudModalDispatchFactory(hookSlice.actions)()

  const setSelectedType = (payload: SetSelectedTypeAction) => {
    dispatch(actions.setSelectedType(payload))
  }

  const resetSelectedType = () => {
    dispatch(actions.resetSelectedType())
  }

  return {
    setSelectedType,
    resetSelectedType,
    ...curdDispatch,
  }
}
