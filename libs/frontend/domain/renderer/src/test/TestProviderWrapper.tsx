import type { IRootStore } from '@codelab/frontend/abstract/core'
import { StoreProvider } from '@codelab/frontend/presentation/container'
import React from 'react'
import type { ITestRootStore } from './setup/test-root-store.interface'

const TestProviderWrapper =
  (store: ITestRootStore) =>
  ({ children }: React.PropsWithChildren) => {
    return (
      <StoreProvider value={store as unknown as IRootStore}>
        {children}
      </StoreProvider>
    )
  }

export default TestProviderWrapper
