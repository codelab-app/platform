import { crudModalDispatchFactory } from '@codelab/frontend/view/components'
import { useDispatch } from 'react-redux'
import { appSlice, SetCurrentAppAction } from '../store'

export const useAppDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = appSlice
  const curdDispatch = crudModalDispatchFactory(appSlice.actions)()

  const setCurrentApp = (payload: SetCurrentAppAction) => {
    dispatch(actions.setCurrentApp(payload))
  }

  return {
    setCurrentApp,
    ...curdDispatch,
  }
}
