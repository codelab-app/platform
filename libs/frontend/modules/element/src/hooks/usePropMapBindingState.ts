import { DefaultRootState, useSelector } from 'react-redux'
import { PropMapBindingState } from '../store'

export const propMapBindingSelector = (rootState: DefaultRootState) =>
  rootState.propMapBinding

export const usePropMapBindingState = (): PropMapBindingState => {
  return useSelector(propMapBindingSelector)
}
