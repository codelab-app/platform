'use client'

import { useUrl } from '@codelab/frontend-application-shared-store/router'
import {
  ApplicationStoreContext,
  type ApplicationStoreProviderProps,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import React, { type PropsWithChildren, useMemo } from 'react'
import { createApplicationStore } from '../stores/application.store'

export const ApplicationStoreProvider: React.FC<
  PropsWithChildren<ApplicationStoreProviderProps>
> = ({ children }) => {
  const url = useUrl()
  const domainStore = useDomainStore()
  const store = useMemo(() => createApplicationStore(url, domainStore), [])

  return (
    <ApplicationStoreContext.Provider value={store}>
      {children}
    </ApplicationStoreContext.Provider>
  )
}
