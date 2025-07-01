'use client'

import type { PropsWithChildren } from 'react'

import {
  createRootStore,
  RootStoreProvider,
} from '@codelab/frontend-infra-mobx-store'
import { CuiProvider } from '@codelab/frontend-presentation-codelab-ui'
import { Provider } from 'jotai'
import { useMemo } from 'react'

export const RootProviders = ({ children }: PropsWithChildren) => {
  const rootStore = useMemo(() => createRootStore(), [])

  return (
    <CuiProvider>
      <Provider>
        <RootStoreProvider value={rootStore}>{children}</RootStoreProvider>
      </Provider>
    </CuiProvider>
  )
}
