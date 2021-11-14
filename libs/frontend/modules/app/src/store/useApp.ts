import {
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/view/components'
import { useDispatch } from 'react-redux'
import { AppFragment } from '../graphql/App.fragment.graphql.gen'
import { appActions } from './appState'

export const useApp = () => {
  const dispatch = useDispatch()

  const openCreateModal = () => {
    dispatch(appActions.openCreateModal())
  }

  const openDeleteModal = (
    payload: OpenDeleteModalActionPayload<AppFragment>,
  ) => dispatch(appActions.openDeleteModal(payload))

  const openUpdateModal = (
    payload: OpenUpdateModalActionPayload<AppFragment>,
  ) => {
    dispatch(appActions.openUpdateModal(payload))
  }

  const setLoading = (payload: boolean) => {
    dispatch(appActions.setLoading(payload))
  }

  const reset = () => {
    dispatch(appActions.reset())
  }

  return {
    openCreateModal,
    openDeleteModal,
    openUpdateModal,
    setLoading,
    reset,
  }
}
