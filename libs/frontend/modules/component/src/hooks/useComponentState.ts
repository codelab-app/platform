import { DefaultRootState, useSelector } from 'react-redux'
import { ComponentState } from '../store'

export const componentSelector = (rootState: DefaultRootState) =>
  rootState.component

export const useComponentState = (): ComponentState => {
  return useSelector(componentSelector)
}
