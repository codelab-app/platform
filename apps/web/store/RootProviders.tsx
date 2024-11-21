'use client'

import type { IPreferenceDto, IUserDto } from '@codelab/shared/abstract/core'
import type { PropsWithChildren } from 'react'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import {
  createRootStore,
  RootStoreProvider,
} from '@codelab/frontend-infra-mobx/store'
import { Provider } from 'jotai'
import { useMemo } from 'react'

export const RootProviders = ({
  children,
  preference,
  user,
}: PropsWithChildren<{ user: IUserDto; preference: IPreferenceDto }>) => {
  const pathParams = useUrlPathParams()

  const rootStore = useMemo(
    () =>
      createRootStore({
        preference,
        routerProps: {
          pathParams,
        },
        user,
      }),
    [user.id],
  )

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
