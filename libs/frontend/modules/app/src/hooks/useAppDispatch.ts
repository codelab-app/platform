import { useDispatch } from 'react-redux'
import { appSlice } from '../store'
import { OpenDeleteAppModalAction, OpenUpdateAppModalAction } from './types'

export const useAppDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = appSlice

  const openCreateModal = () => {
    dispatch(actions.openCreateModal())
  }

  const openDeleteModal = (payload: OpenDeleteAppModalAction) =>
    dispatch(actions.openDeleteModal(payload))

  const openUpdateModal = (payload: OpenUpdateAppModalAction) => {
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
