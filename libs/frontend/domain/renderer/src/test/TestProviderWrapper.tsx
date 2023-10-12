import type { IRootStore } from '@codelab/frontend/abstract/application'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import React from 'react'
import type { ITestRootStore } from './setup/test-root-store.interface'

export const TestProviderWrapper =
  (store: ITestRootStore) =>
  ({ children }: React.PropsWithChildren) => {
    return (
      <StoreProvider value={store as unknown as IRootStore}>
        {children}
      </StoreProvider>
    )
  }
