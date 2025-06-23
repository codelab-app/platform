'use client'

import type { IDomainStore } from '@codelab/frontend-abstract-domain'

import { createContext, useContext } from 'react'

export const DomainStoreContext = createContext<IDomainStore | null>(null)

export interface DomainStoreProviderProps {
  value: IDomainStore
}

export const useDomainStore = () => {
  const store = useContext(DomainStoreContext)

  if (!store) {
    throw new Error(
      'useDomainStore must be used within a StoreProvider with a non-null value',
    )
  }

  return store
}
