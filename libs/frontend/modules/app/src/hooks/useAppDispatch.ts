import { useDispatch } from 'react-redux'
import {
  appSlice,
  OpenDeleteAppModalAction,
  OpenUpdateAppModalAction,
  SetCurrentAppAction,
} from '../store'

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

  const openImportModal = () => {
    dispatch(actions.openImportModal())
  }

  const reset = () => {
    dispatch(actions.reset())
  }

  const setCurrentApp = (payload: SetCurrentAppAction) => {
    dispatch(actions.setCurrentApp(payload))
  }

  return {
    openCreateModal,
    openDeleteModal,
    openUpdateModal,
    openImportModal,
    setCurrentApp,
    reset,
  }
}
