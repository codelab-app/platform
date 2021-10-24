import { ApolloClient } from '@apollo/client'
import { appSlice } from '@codelab/frontend/modules/app'
import { configureStore, Store } from '@reduxjs/toolkit'

export const REDUX_STATE_PROP_NAME = '__REDUX_STATE__'

const createStore = (preloadedState: any, client: ApolloClient<any>) => {
  return configureStore({
    reducer: {
      apps: appSlice.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: { client } } }),
  })
}

let store: Store | undefined

export const initializeStore = (
  ssPageProps: any,
  client: ApolloClient<any>,
) => {
  const preloadedState = ssPageProps[REDUX_STATE_PROP_NAME]
  let _store = store ?? createStore(preloadedState, client)

  if (preloadedState && store) {
    _store = createStore({ ...store.getState(), ...preloadedState }, client)
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
