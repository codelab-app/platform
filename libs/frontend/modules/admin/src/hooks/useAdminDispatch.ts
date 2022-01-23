import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { useDispatch } from 'react-redux'
import { adminSlice } from '../store'

export const useAdminDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = adminSlice
  const crudDispatch = crudModalDispatchFactory(adminSlice.actions)()

  const openExecuteCommandModal = () => {
    dispatch(actions.openExecuteCommandModal())
  }

  return {
    openExecuteCommandModal,
    ...crudDispatch,
  }
}
