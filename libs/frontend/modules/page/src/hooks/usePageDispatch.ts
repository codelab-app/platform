import { useDispatch } from 'react-redux'
import {
  OpenDeletePageModalAction,
  OpenUpdatePageModalAction,
  pageSlice,
  SetCurrentPageAction,
} from '../store'

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

  const setCurrentPage = (payload: SetCurrentPageAction) => {
    dispatch(actions.setCurrentPage(payload))
  }

  return {
    openCreateModal,
    openDeleteModal,
    openUpdateModal,
    setCurrentPage,
    reset,
  }
}
