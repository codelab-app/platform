'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import {
  ApplicationStoreProvider,
  DomainStoreProvider,
} from '@codelab/frontend-infra-mobx/store'
import type { IUserDto } from '@codelab/shared/abstract/core'
import App from 'antd/lib/app'
import ConfigProvider from 'antd/lib/config-provider'
import { Provider } from 'jotai'
import type { PropsWithChildren, ReactNode } from 'react'
import React from 'react'
import { StyledComponentsRegistry } from './StyledComponentsRegistry'
import { theme } from './theme'

export const RootProviders = ({
  children,
  user,
}: PropsWithChildren<{ user: IUserDto }>) => {
  return (
    <UserProvider>
      <CuiProvider>
        <Provider>
          <ApplicationStoreProvider>
            <DomainStoreProvider user={user}>{children}</DomainStoreProvider>
          </ApplicationStoreProvider>
        </Provider>
      </CuiProvider>
    </UserProvider>
  )
}
