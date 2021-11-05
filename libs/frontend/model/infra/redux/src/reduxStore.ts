import { appEndpoints } from '@codelab/frontend/modules/app'
import { configureStore, Store } from '@reduxjs/toolkit'

export const REDUX_STATE_PROP_NAME = '__REDUX_STATE__'

const createStore = (preloadedState: any) => {
  return configureStore({
    reducer: {
      [appEndpoints.reducerPath]: appEndpoints.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(appEndpoints.middleware),
    preloadedState,
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
