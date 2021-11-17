import { DefaultRootState, useSelector } from 'react-redux'

const atomSelector = (rootState: DefaultRootState) => rootState.atom

export const useAtomState = () => useSelector(atomSelector)
