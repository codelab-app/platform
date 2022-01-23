import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { useDispatch } from 'react-redux'
import { SetSelectedTypeIdsModalAction, typeSlice } from '../store'

export const useTypeDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = typeSlice
  const curdDispatch = crudModalDispatchFactory(typeSlice.actions)()

  const setSelectedIds = (payload: SetSelectedTypeIdsModalAction) => {
    dispatch(actions.setSelectedIds(payload))
  }

  return {
    setSelectedIds,
    ...curdDispatch,
  }
}
