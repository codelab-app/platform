import { createContext, useContext } from 'react'
import { RootStore } from './store'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const StoreContext = createContext<RootStore>(null!)

export const StoreProvider = StoreContext.Provider

export const useStore = () => {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error('StoreProvider not found')
  }

  return store
}
