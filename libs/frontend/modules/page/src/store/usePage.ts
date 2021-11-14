import {
  OpenDeleteModalActionPayload,
  OpenUpdateModalActionPayload,
} from '@codelab/frontend/view/components'
import { useDispatch } from 'react-redux'
import { PageBaseFragment } from '../graphql/PageBase.fragment.graphql.gen'
import { pageActions } from './pageState'

export const useApp = () => {
  const dispatch = useDispatch()

  const openCreateModal = () => {
    dispatch(pageActions.openCreateModal())
  }

  const openDeleteModal = (
    payload: OpenDeleteModalActionPayload<PageBaseFragment>,
  ) => dispatch(pageActions.openDeleteModal(payload))

  const openUpdateModal = (
    payload: OpenUpdateModalActionPayload<PageBaseFragment>,
  ) => {
    dispatch(pageActions.openUpdateModal(payload))
  }

  const setLoading = (payload: boolean) => {
    dispatch(pageActions.setLoading(payload))
  }

  const reset = () => {
    dispatch(pageActions.reset())
  }

  return {
    openCreateModal,
    openDeleteModal,
    openUpdateModal,
    setLoading,
    reset,
  }
}
