import { DefaultRootState, useSelector } from 'react-redux'
import { HookState } from '../store'

export const hookSelector = (rootState: DefaultRootState) => rootState.hook

export const useHookState = (): HookState => {
  return useSelector(hookSelector)
}
