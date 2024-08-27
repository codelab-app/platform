'use client'

import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import type { IUserDto } from '@codelab/shared/abstract/core'
import { createContext, useContext } from 'react'

export const DomainStoreContext = createContext<IDomainStore | null>(null)

export interface DomainStoreProviderProps {
  user: IUserDto | null
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
