'use client'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import {
  ApplicationStoreProvider,
  DomainStoreProvider,
} from '@codelab/frontend-infra-mobx/store'
import type { IUserDto } from '@codelab/shared/abstract/core'
import { Provider } from 'jotai'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { StyleProviders } from './StyleProviders'

export const RootProviders = ({
  children,
  user,
}: PropsWithChildren<{ user: IUserDto }>) => {
  const url = useUrl()
  const rootStore = useMemo(() => createRootStore(user, url), [user, url])

  return (
    <UserProvider>
      <CuiProvider>
        <Provider>
            <RootStoreProvider value={rootStore}>{children}</RootStoreProvider>
        </Provider>
      </CuiProvider>
    </UserProvider>
  )
}
