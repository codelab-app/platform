import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { useDispatch } from 'react-redux'
import { atomSlice, SetSelectedAtomIdsModalAction } from '../store'

export const useAtomDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = atomSlice
  const curdDispatch = crudModalDispatchFactory(atomSlice.actions)()

  const setSelectedIds = (payload: SetSelectedAtomIdsModalAction) => {
    dispatch(actions.setSelectedIds(payload))
  }

  return {
    setSelectedIds,
    ...curdDispatch,
  }
}
