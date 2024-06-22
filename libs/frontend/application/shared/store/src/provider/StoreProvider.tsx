'use client'

import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'

const StoreContext = createContext<IDomainStore | null>(null)

interface StoreProviderProps {
  value: IDomainStore | null
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
