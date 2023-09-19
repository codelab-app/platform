import type { IRootStore } from '@codelab/frontend/abstract/core'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'

const StoreContext = createContext<IRootStore>(null!)

interface StoreProviderProps {
  value: IRootStore | null
}

export const StoreProvider: React.FC<PropsWithChildren<StoreProviderProps>> = ({
  children,
  value,
}) => {
  return value ? (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  ) : (
    <>{children}</>
  )
}

export const useStore = () => useContext(StoreContext)
