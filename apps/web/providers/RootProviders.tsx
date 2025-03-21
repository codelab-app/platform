'use client'

import type { IUserDto } from '@codelab/shared/abstract/core'
import type { PropsWithChildren } from 'react'

import { Auth0Provider } from '@auth0/nextjs-auth0'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import {
  createRootStore,
  RootStoreProvider,
} from '@codelab/frontend-infra-mobx/store'
import { Provider } from 'jotai'
import { useMemo } from 'react'

export const RootProviders = ({
  children,
  user,
}: PropsWithChildren<{ user: IUserDto }>) => {
  const rootStore = useMemo(
    () =>
      createRootStore({
        user,
      }),
    [user.id],
  )

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
