import { adminEndpoints, adminSlice } from '@codelab/frontend/modules/admin'
import { appEndpoints, appSlice } from '@codelab/frontend/modules/app'
import { atomEndpoints, atomSlice } from '@codelab/frontend/modules/atom'
import { builderSlice } from '@codelab/frontend/modules/builder'
import {
  componentSlice,
  elementEndpoints,
  elementEndpointsV2,
  elementSlice,
  hookEndpoints,
  hookSlice,
  propMapBindingEndpoints,
  propMapBindingSlice,
} from '@codelab/frontend/modules/element'
import { lambdaEndpoints, lambdaSlice } from '@codelab/frontend/modules/lambda'
import { pageEndpoints, pageSlice } from '@codelab/frontend/modules/page'
import { tagEndpoints, tagSlice } from '@codelab/frontend/modules/tag'
import {
  createTypeEndpoints,
  deleteTypeEndpoints,
  fieldSlice,
  typeSlice,
  updateTypeEndpoints,
} from '@codelab/frontend/modules/type'
import { userEndpoints, userSlice } from '@codelab/frontend/modules/user'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      // APIs:
      [appEndpoints.reducerPath]: appEndpoints.reducer,
      [adminEndpoints.reducerPath]: adminEndpoints.reducer,
      [pageEndpoints.reducerPath]: pageEndpoints.reducer,
      [elementEndpoints.reducerPath]: elementEndpoints.reducer,
      [hookEndpoints.reducerPath]: hookEndpoints.reducer,
      [propMapBindingEndpoints.reducerPath]: propMapBindingEndpoints.reducer,
      [atomEndpoints.reducerPath]: atomEndpoints.reducer,
      [tagEndpoints.reducerPath]: tagEndpoints.reducer,
      [lambdaEndpoints.reducerPath]: lambdaEndpoints.reducer,
      [userEndpoints.reducerPath]: userEndpoints.reducer,
      [deleteTypeEndpoints.reducerPath]: deleteTypeEndpoints.reducer,
      [updateTypeEndpoints.reducerPath]: updateTypeEndpoints.reducer,
      [createTypeEndpoints.reducerPath]: createTypeEndpoints.reducer,
      [elementEndpoints.reducerPath]: elementEndpoints.reducer,

      // Slices:
      [appSlice.name]: appSlice.reducer,
      [adminSlice.name]: adminSlice.reducer,
      [atomSlice.name]: atomSlice.reducer,
      [elementSlice.name]: elementSlice.reducer,
      [builderSlice.name]: builderSlice.reducer,
      [componentSlice.name]: componentSlice.reducer,
      [elementSlice.name]: elementSlice.reducer,
      [hookSlice.name]: hookSlice.reducer,
      [pageSlice.name]: pageSlice.reducer,
      [lambdaSlice.name]: lambdaSlice.reducer,
      [propMapBindingSlice.name]: propMapBindingSlice.reducer,
      [tagSlice.name]: tagSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [typeSlice.name]: typeSlice.reducer,
      [fieldSlice.name]: fieldSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        appEndpoints.middleware,
        adminEndpoints.middleware,
        pageEndpoints.middleware,
        elementEndpoints.middleware,
        hookEndpoints.middleware,
        propMapBindingEndpoints.middleware,
        atomEndpoints.middleware,
        userEndpoints.middleware,
        deleteTypeEndpoints.middleware,
        updateTypeEndpoints.middleware,
        createTypeEndpoints.middleware,
      ),
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
  deserializeState: (state) => JSON.parse(state),
})
