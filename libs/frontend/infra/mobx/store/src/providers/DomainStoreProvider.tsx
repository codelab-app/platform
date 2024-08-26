import {
  DomainStoreContext,
  type DomainStoreProviderProps,
} from '@codelab/frontend-infra-mobx/context'
import { type PropsWithChildren } from 'react'
import React from 'react'

export const DomainStoreProvider: React.FC<
  PropsWithChildren<DomainStoreProviderProps>
> = ({ children, value }) => {
  return (
    <DomainStoreContext.Provider value={value}>
      {children}
    </DomainStoreContext.Provider>
  )
}
