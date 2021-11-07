import { adminEndpoints } from '@codelab/frontend/modules/admin'
import { appEndpoints } from '@codelab/frontend/modules/app'
import { atomEndpoints } from '@codelab/frontend/modules/atom'
import { elementEndpoints } from '@codelab/frontend/modules/element'
import { lambdaEndpoints } from '@codelab/frontend/modules/lambda'
import { pageEndpoints } from '@codelab/frontend/modules/page'
import { tagEndpoints } from '@codelab/frontend/modules/tag'
import { combineReducers, configureStore, Store } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const REDUX_STATE_PROP_NAME = '__REDUX_STATE__'

const createStore = (preloadedState: any) => {
  const store = configureStore({
    reducer: combineReducers({
      [appEndpoints.reducerPath]: appEndpoints.reducer,
      [pageEndpoints.reducerPath]: pageEndpoints.reducer,
      [elementEndpoints.reducerPath]: elementEndpoints.reducer,
      [atomEndpoints.reducerPath]: atomEndpoints.reducer,
      [adminEndpoints.reducerPath]: adminEndpoints.reducer,
      [tagEndpoints.reducerPath]: tagEndpoints.reducer,
      [lambdaEndpoints.reducerPath]: lambdaEndpoints.reducer,
    }),
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        appEndpoints.middleware,
        pageEndpoints.middleware,
        elementEndpoints.middleware,
        atomEndpoints.middleware,
        adminEndpoints.middleware,
      ),
  })

  setupListeners(store.dispatch)

  return store
}

let store: Store | undefined

export const initializeStore = (context: any) => {
  const preloadedState = context[REDUX_STATE_PROP_NAME]
  let _store = store ?? createStore(preloadedState)

  if (preloadedState && store) {
    _store = createStore({ ...store.getState(), ...preloadedState })
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store
  }

  // Create the store once in the client
  if (!store) {
    store = _store
  }

  return _store
}
