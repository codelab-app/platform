import { DefaultRootState, useSelector } from 'react-redux'
import { FieldState } from '../store'

export const fieldSelector = (rootState: DefaultRootState) => rootState.field

export const useFieldState = (): FieldState => {
  return useSelector(fieldSelector)
}
