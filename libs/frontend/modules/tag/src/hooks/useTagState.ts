import { DefaultRootState, useSelector } from 'react-redux'

const tagSelector = (rootState: DefaultRootState) => rootState.tag

export const useTagState = () => useSelector(tagSelector)
