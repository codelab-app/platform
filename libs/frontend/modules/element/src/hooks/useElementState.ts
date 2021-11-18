import { DefaultRootState, useSelector } from 'react-redux'
import { ElementState } from '../store'

export const elementSelector = (rootState: DefaultRootState) =>
  rootState.element

export const useElementState = (): ElementState => {
  return useSelector(elementSelector)
}
