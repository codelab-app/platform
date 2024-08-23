'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import { DomainStoreProvider } from '@codelab/frontend-infra-mobx/store'
import type { IUserDto } from '@codelab/shared/abstract/core'
import App from 'antd/lib/app'
import ConfigProvider from 'antd/lib/config-provider'
import { Provider } from 'jotai'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { theme } from './theme'

export const RootProviders = ({
  children,
  user,
}: PropsWithChildren<{ user: IUserDto }>) => {
  return (
    <UserProvider>
      <CuiProvider>
        <ConfigProvider theme={theme}>
          <AntdRegistry>
            <Provider>
              <DomainStoreProvider user={user}>
                <App className="h-full">{children}</App>
              </DomainStoreProvider>
            </Provider>
          </AntdRegistry>
        </ConfigProvider>
      </CuiProvider>
    </UserProvider>
  )
}
