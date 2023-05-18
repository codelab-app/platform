import type { IRootStore } from '@codelab/frontend/abstract/core'
import { createContext, useContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const StoreContext = createContext<IRootStore>(null!)

export const StoreProvider = StoreContext.Provider

export const useStore = () => {
  const store = useContext(StoreContext)

  return store
}
