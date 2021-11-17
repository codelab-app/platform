import { useDispatch } from 'react-redux'
import {
  lambdaSlice,
  OpenDeleteLambdaModalAction,
  OpenUpdateLambdaModalAction,
} from '../store'

export const useLambdaDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = lambdaSlice

  const openCreateModal = () => {
    dispatch(actions.openCreateModal())
  }

  const openDeleteModal = (payload: OpenDeleteLambdaModalAction) =>
    dispatch(actions.openDeleteModal(payload))

  const openUpdateModal = (payload: OpenUpdateLambdaModalAction) => {
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
