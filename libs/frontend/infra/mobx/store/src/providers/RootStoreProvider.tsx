'use client'

import type { IRootStore } from '@codelab/frontend/abstract/application'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'
import { ApplicationStoreProvider } from './ApplicationStoreProvider'
import { DomainStoreProvider } from './DomainStoreProvider'

const RootStoreContext = createContext<IRootStore>(null!)

interface StoreProviderProps {
  value: IRootStore
}

export const RootStoreProvider: React.FC<
  PropsWithChildren<StoreProviderProps>
> = ({ children, value }) => {
  return (
    <RootStoreContext.Provider value={value}>
      <ApplicationStoreProvider value={value.applicationStore}>
        <DomainStoreProvider value={value.domainStore}>
          {children}
        </DomainStoreProvider>
      </ApplicationStoreProvider>
    </RootStoreContext.Provider>
  )
}

export const useTestStore = () => useContext(RootStoreContext)
