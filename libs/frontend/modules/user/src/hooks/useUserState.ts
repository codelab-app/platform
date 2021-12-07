import { DefaultRootState, useSelector } from 'react-redux'

const userSelector = (rootState: DefaultRootState) => rootState.user

export const useUserState = () => useSelector(userSelector)
