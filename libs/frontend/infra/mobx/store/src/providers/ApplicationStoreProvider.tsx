'use client'

import {
  ApplicationStoreContext,
  type ApplicationStoreProviderProps,
} from '@codelab/frontend-infra-mobx/context'
import { type PropsWithChildren } from 'react'

export const ApplicationStoreProvider: React.FC<
  PropsWithChildren<ApplicationStoreProviderProps>
> = ({ children, value }) => {
  return (
    <ApplicationStoreContext.Provider value={value}>
      {children}
    </ApplicationStoreContext.Provider>
  )
}
