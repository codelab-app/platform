import { useDispatch } from 'react-redux'
import { userSlice, UserStateDeletePayload } from '../store'

export const useUserDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = userSlice

  const resetModal = () => {
    dispatch(actions.resetModal())
  }

  const openDeleteModal = (payload: UserStateDeletePayload) => {
    dispatch(actions.openDeleteModal(payload))
  }

  return {
    resetModal,
    openDeleteModal,
  }
}
