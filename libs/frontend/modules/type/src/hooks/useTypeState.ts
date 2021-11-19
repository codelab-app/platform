import { DefaultRootState, useSelector } from 'react-redux'

export const typeSelector = (rootState: DefaultRootState) => rootState.type

export const useTypeState = () => {
  return useSelector(typeSelector)
}
