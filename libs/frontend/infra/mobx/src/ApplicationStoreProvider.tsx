'use client'

import type { IApplicationStore } from '@codelab/frontend/abstract/application'
import type { PropsWithChildren } from 'react'
import React, { createContext, useContext, useMemo } from 'react'
import { createApplicationStore } from './application.store'

const ApplicationStoreContext = createContext<IApplicationStore | null>(null)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ApplicationStoreProviderProps {
  //
}

export const ApplicationStoreProvider: React.FC<
  PropsWithChildren<ApplicationStoreProviderProps>
> = ({ children }) => {
  const store = useMemo(() => createApplicationStore(), [])

  return (
    <ApplicationStoreContext.Provider value={store}>
      {children}
    </ApplicationStoreContext.Provider>
  )
}

export const useApplicationStore = () => {
  const store = useContext(ApplicationStoreContext)

  if (!store) {
    throw new Error(
      'useApplicationStore() must be used within a ApplicationStoreProvider with a non-null value',
    )
  }

  return store
}
