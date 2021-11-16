import { DefaultRootState, useSelector } from 'react-redux'

const pageSelector = (rootState: DefaultRootState) => rootState.page

export const usePageState = () => useSelector(pageSelector)
