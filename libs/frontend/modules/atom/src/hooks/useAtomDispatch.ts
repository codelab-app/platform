import { useDispatch } from 'react-redux'
import {
  atomSlice,
  OpenDeleteAtomModalAction,
  OpenUpdateAtomModalAction,
} from '../store'

export const useAtomDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = atomSlice

  const openCreateModal = () => {
    dispatch(actions.openCreateModal())
  }

  const openDeleteModal = (payload: OpenDeleteAtomModalAction) =>
    dispatch(actions.openDeleteModal(payload))

  const openUpdateModal = (payload: OpenUpdateAtomModalAction) => {
    dispatch(actions.openUpdateModal(payload))
  }

  const reset = () => {
    dispatch(actions.reset())
  }

  return {
    openCreateModal,
    openDeleteModal,
    openUpdateModal,
    reset,
  }
}
