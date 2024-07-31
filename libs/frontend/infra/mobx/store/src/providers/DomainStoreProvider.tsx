import {
  DomainStoreContext,
  type DomainStoreProviderProps,
} from '@codelab/frontend-infra-mobx/context'
import { type PropsWithChildren, useMemo } from 'react'
import React from 'react'
import { createDomainStore } from '../stores/domain.store'

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
