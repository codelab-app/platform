import { useDispatch } from 'react-redux'
import { pageSlice } from '../store'
import { OpenDeletePageModalAction, OpenUpdatePageModalAction } from './types'

export const usePageDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = pageSlice

  const openCreateModal = () => {
    dispatch(actions.openCreateModal())
  }

  const openDeleteModal = (payload: OpenDeletePageModalAction) =>
    dispatch(actions.openDeleteModal(payload))

  const openUpdateModal = (payload: OpenUpdatePageModalAction) => {
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
