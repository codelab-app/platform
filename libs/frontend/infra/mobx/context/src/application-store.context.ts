'use client'

import type { IApplicationStore } from '@codelab/frontend/abstract/application'
import { createContext, useContext } from 'react'

export const ApplicationStoreContext = createContext<IApplicationStore | null>(
  null,
)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApplicationStoreProviderProps {
  value: IApplicationStore
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
