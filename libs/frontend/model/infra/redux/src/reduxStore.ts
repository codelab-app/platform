import { adminEndpoints } from '@codelab/frontend/modules/admin'
import { appEndpoints } from '@codelab/frontend/modules/app'
import { atomEndpoints } from '@codelab/frontend/modules/atom'
import { pageEndpoints } from '@codelab/frontend/modules/page'
import { tagEndpoints } from '@codelab/frontend/modules/tag'
import { combineReducers, configureStore, Store } from '@reduxjs/toolkit'

export const REDUX_STATE_PROP_NAME = '__REDUX_STATE__'

const createStore = (preloadedState: any) => {
  return configureStore({
    reducer: combineReducers({
      [appEndpoints.reducerPath]: appEndpoints.reducer,
      [pageEndpoints.reducerPath]: pageEndpoints.reducer,
      [atomEndpoints.reducerPath]: atomEndpoints.reducer,
      [adminEndpoints.reducerPath]: adminEndpoints.reducer,
      [tagEndpoints.reducerPath]: tagEndpoints.reducer,
    }),
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        appEndpoints.middleware,
        pageEndpoints.middleware,
        atomEndpoints.middleware,
        adminEndpoints.middleware,
      ),
  })
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
