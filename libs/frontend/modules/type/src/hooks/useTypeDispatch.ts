import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { useDispatch } from 'react-redux'
import { SetSelectedTypeIdsModalAction } from '../store/types'
import { typeSlice } from '../store/typeState'

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
