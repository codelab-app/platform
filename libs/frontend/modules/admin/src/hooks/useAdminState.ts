import { DefaultRootState, useSelector } from 'react-redux'

const adminSelector = (rootState: DefaultRootState) => rootState.admin

export const useAdminState = () => useSelector(adminSelector)
