'use client'

import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import { createDomainStore } from '@codelab/frontend/infra/mobx'
import type { IUserDto } from '@codelab/shared/abstract/core'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'

const StoreContext = createContext<IDomainStore | null>(null)

interface StoreProviderProps {
  user: IUserDto | null
}

export const StoreProvider: React.FC<PropsWithChildren<StoreProviderProps>> = ({
  children,
  user,
}) => {
  return user ? (
    <StoreContext.Provider value={createDomainStore(user)}>
      {children}
    </StoreContext.Provider>
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
