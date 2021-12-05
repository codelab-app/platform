import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { useDispatch } from 'react-redux'
import { appSlice, SetCurrentAppAction } from '../store'

export const useAppDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = appSlice
  const curdDispatch = crudModalDispatchFactory(appSlice.actions)()

  const openImportModal = () => {
    dispatch(actions.openImportModal())
  }

  const setCurrentApp = (payload: SetCurrentAppAction) => {
    dispatch(actions.setCurrentApp(payload))
  }

  return {
    openImportModal,
    setCurrentApp,
    ...curdDispatch,
  }
}
