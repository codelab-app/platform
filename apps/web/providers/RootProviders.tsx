'use client'

import type { IUserDto } from '@codelab/shared-abstract-core'
import type { PropsWithChildren } from 'react'

import { Auth0Provider } from '@auth0/nextjs-auth0'
import {
  createRootStore,
  RootStoreProvider,
} from '@codelab/frontend-infra-mobx-store'
import { CuiProvider } from '@codelab/frontend-presentation-codelab-ui'
import { Provider } from 'jotai'
import { useMemo } from 'react'

export const RootProviders = ({
  children,
  user,
}: PropsWithChildren<{ user: IUserDto }>) => {
  const rootStore = useMemo(() => {
    const store = createRootStore()

    store.rootStore.setUser(user)

    return store
  }, [user.id]) // Only recreate if user ID changes, not on every render

  return (
    <Auth0Provider>
      <CuiProvider>
        <Provider>
          <RootStoreProvider value={rootStore}>{children}</RootStoreProvider>
        </Provider>
      </CuiProvider>
    </Auth0Provider>
  )
}
