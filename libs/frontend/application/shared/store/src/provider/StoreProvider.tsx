'use client'

import type { ICoreStore } from '@codelab/frontend/abstract/application'
import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import { createDomainStore } from '@codelab/frontend/infra/mobx'
import type { IUserDto } from '@codelab/shared/abstract/core'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext, useMemo } from 'react'

const StoreContext = createContext<IDomainStore | null>(null)

interface StoreProviderProps {
  user: IUserDto | null
}

export const StoreProvider: React.FC<PropsWithChildren<StoreProviderProps>> = ({
  children,
  user,
}) => {
  const store = useMemo(() => (user ? createDomainStore(user) : null), [user])

  return store ? (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  ) : (
    children
  )
}

export const useDomainStore = () => {
  const store = useContext(StoreContext)

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
