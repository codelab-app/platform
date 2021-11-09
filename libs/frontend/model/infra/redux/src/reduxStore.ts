import { adminEndpoints } from '@codelab/frontend/modules/admin'
import { appEndpoints } from '@codelab/frontend/modules/app'
import { atomEndpoints } from '@codelab/frontend/modules/atom'
import {
  componentEndpoints,
  elementEndpoints,
  hookEndpoints,
  propMapBindingEndpoints,
} from '@codelab/frontend/modules/element'
import { lambdaEndpoints } from '@codelab/frontend/modules/lambda'
import { pageEndpoints } from '@codelab/frontend/modules/page'
import { tagEndpoints } from '@codelab/frontend/modules/tag'
import { userEndpoints } from '@codelab/frontend/modules/user'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

export const makeStore = () =>
  configureStore({
    reducer: combineReducers({
      [appEndpoints.reducerPath]: appEndpoints.reducer,
      [pageEndpoints.reducerPath]: pageEndpoints.reducer,
      [elementEndpoints.reducerPath]: elementEndpoints.reducer,
      [componentEndpoints.reducerPath]: componentEndpoints.reducer,
      [hookEndpoints.reducerPath]: hookEndpoints.reducer,
      [propMapBindingEndpoints.reducerPath]: propMapBindingEndpoints.reducer,
      [atomEndpoints.reducerPath]: atomEndpoints.reducer,
      [adminEndpoints.reducerPath]: adminEndpoints.reducer,
      [tagEndpoints.reducerPath]: tagEndpoints.reducer,
      [lambdaEndpoints.reducerPath]: lambdaEndpoints.reducer,
      [userEndpoints.reducerPath]: userEndpoints.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        appEndpoints.middleware,
        pageEndpoints.middleware,
        elementEndpoints.middleware,
        componentEndpoints.middleware,
        hookEndpoints.middleware,
        propMapBindingEndpoints.middleware,
        atomEndpoints.middleware,
        adminEndpoints.middleware,
        userEndpoints.middleware,
      ),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const reduxStoreWrapper = createWrapper<AppStore>(makeStore, {
  debug: true,
})
