'use client'

import type { ICoreStore } from '@codelab/frontend/abstract/application'
import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import { createDomainStore } from '@codelab/frontend/infra/mobx'
import type { IUserDto } from '@codelab/shared/abstract/core'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext, useMemo } from 'react'

const DomainStoreContext = createContext<IDomainStore | null>(null)

interface DomainStoreProviderProps {
  user: IUserDto | null
}

export const DomainStoreProvider: React.FC<
  PropsWithChildren<DomainStoreProviderProps>
> = ({ children, user }) => {
  const store = useMemo(() => (user ? createDomainStore(user) : null), [user])

  return store ? (
    <DomainStoreContext.Provider value={store}>
      {children}
    </DomainStoreContext.Provider>
  ) : (
    children
  )
}

export const useDomainStore = () => {
  const store = useContext(DomainStoreContext)

  if (!store) {
    throw new Error(
      'useStore must be used within a StoreProvider with a non-null value',
    )
  }

  return store
}

export const useStore = () => {
  return {} as ICoreStore
}
