'use client'

import type { ICoreStore } from '@codelab/frontend/abstract/application'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'

const StoreContext = createContext<ICoreStore>(null!)

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
    <>{children}</>
  )
}

export const useStore = () => useContext(StoreContext)
