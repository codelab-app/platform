import { DefaultRootState, useSelector } from 'react-redux'

const lambdaSelector = (rootState: DefaultRootState) => rootState.lambda

export const useLambdaState = () => useSelector(lambdaSelector)
