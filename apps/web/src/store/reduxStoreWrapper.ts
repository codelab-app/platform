import { builderSlice } from '@codelab/frontend/modules/builder'
import { lambdaEndpoints, lambdaSlice } from '@codelab/frontend/modules/lambda'
import { userEndpoints, userSlice } from '@codelab/frontend/modules/user'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      // APIs:
      [lambdaEndpoints.reducerPath]: lambdaEndpoints.reducer,
      [userEndpoints.reducerPath]: userEndpoints.reducer,

      // Slices:
      [builderSlice.name]: builderSlice.reducer,
      [lambdaSlice.name]: lambdaSlice.reducer,
      [userSlice.name]: userSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userEndpoints.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<RootStore['getState']>
export type RootDispatch = RootStore['dispatch']

export const reduxStoreWrapper = createWrapper<RootStore>(makeStore, {
  debug: false,
  // Solve the issue where values in Next.js SSR can't be undefined
  // https://github.com/vercel/next.js/discussions/11209#discussioncomment-1779113
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => {
    return typeof state === 'string' ? JSON.parse(state) : state
  },
})
