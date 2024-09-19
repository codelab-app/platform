'use client'

import type { RootStoreProviderProps } from '@codelab/frontend-infra-mobx/context'
import { RootStoreContext } from '@codelab/frontend-infra-mobx/context'
import type { PropsWithChildren } from 'react'
import { ApplicationStoreProvider } from './ApplicationStoreProvider'
import { DomainStoreProvider } from './DomainStoreProvider'

interface StoreProviderProps {
  value: RootStoreProviderProps
}

export const RootStoreProvider: React.FC<
  PropsWithChildren<StoreProviderProps>
> = ({ children, value }) => {
  return (
    <RootStoreContext.Provider value={value}>
      <ApplicationStoreProvider value={value.rootStore.applicationStore}>
        <DomainStoreProvider value={value.rootStore.domainStore}>
          {children}
        </DomainStoreProvider>
      </ApplicationStoreProvider>
    </RootStoreContext.Provider>
  )
}
