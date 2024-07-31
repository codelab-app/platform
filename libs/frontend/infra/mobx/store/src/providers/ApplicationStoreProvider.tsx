import {
  ApplicationStoreContext,
  type ApplicationStoreProviderProps,
} from '@codelab/frontend-infra-mobx/context'
import React, { type PropsWithChildren, useMemo } from 'react'
import { createApplicationStore } from '../stores/application.store'

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
