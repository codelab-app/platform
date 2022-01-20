import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { useDispatch } from 'react-redux'
import { pageSlice, SetCurrentPageAction } from '../store'

export const usePageDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = pageSlice
  const crudDispatch = crudModalDispatchFactory(pageSlice.actions)()

  const setCurrentPage = (payload: SetCurrentPageAction) => {
    dispatch(actions.setCurrentPage(payload))
  }

  return {
    setCurrentPage,
    ...crudDispatch,
  }
}
