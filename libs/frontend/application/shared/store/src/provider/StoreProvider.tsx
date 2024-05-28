'use client'

import type { ICoreStore } from '@codelab/frontend/abstract/application'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'

const StoreContext = createContext<ICoreStore | null>(null)

interface StoreProviderProps {
  value: ICoreStore | null
}

export const StoreProvider: React.FC<PropsWithChildren<StoreProviderProps>> = ({
  children,
  value,
}) => {
  return value ? (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  ) : (
    children
  )
}

export const useStore = () => {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error(
      'useStore must be used within a StoreProvider with a non-null value',
    )
  }

  return store
}
