'use client'

import type { IBuilderService } from '@codelab/frontend/abstract/application'
import type { BuilderService } from '@codelab/frontend-application-builder/services'
import type { IUserDto } from '@codelab/shared/abstract/core'
import type { SnapshotInOf, SnapshotOutOf } from 'mobx-keystone'
import type { PropsWithChildren } from 'react'

import { Auth0Provider } from '@auth0/nextjs-auth0'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import { BUILDER_SERVICE } from '@codelab/frontend-application-builder/services'
import {
  createRootStore,
  RootStoreProvider,
} from '@codelab/frontend-infra-mobx/store'
import { Provider } from 'jotai'
import { useMemo } from 'react'
import { useLocalStorage } from 'react-use'

export const RootProviders = ({
  children,
  user,
}: PropsWithChildren<{ user: IUserDto }>) => {
  const [value, setValue, remove] =
    useLocalStorage<SnapshotInOf<IBuilderService>>(BUILDER_SERVICE)

  const rootStore = useMemo(
    () =>
      createRootStore({
        builderServiceSnapshot: value,
        user,
      }),
    [user.id],
  )

  console.log(value)

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
