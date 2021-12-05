import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { useDispatch } from 'react-redux'
import { pageSlice, SetCurrentPageAction } from '../store'

export const usePageDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = pageSlice
  const curdDispatch = crudModalDispatchFactory(pageSlice.actions)()

  const setCurrentPage = (payload: SetCurrentPageAction) => {
    dispatch(actions.setCurrentPage(payload))
  }

  return {
    setCurrentPage,
    ...curdDispatch,
  }
}
