import { DefaultRootState, useSelector } from 'react-redux'

const appSelector = (rootState: DefaultRootState) => rootState.app

export const useAppState = () => useSelector(appSelector)
