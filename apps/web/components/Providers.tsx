'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { StoreProvider } from '@codelab/frontend-application-shared-store/provider'
import type { IUserDto } from '@codelab/shared/abstract/core'
import App from 'antd/lib/app'
import ConfigProvider from 'antd/lib/config-provider'
import { Provider } from 'jotai'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { theme } from '../app/theme'
import { StyledComponentsRegistry } from './StyledComponentsRegistry'

export const Providers = ({
  children,
  user,
}: PropsWithChildren<{ user: IUserDto }>) => {
  return (
    <StyledComponentsRegistry>
      <ConfigProvider theme={theme}>
        <AntdRegistry>
          <Provider>
            <StoreProvider user={user}>
              <App>{children}</App>
            </StoreProvider>
          </Provider>
        </AntdRegistry>
      </ConfigProvider>
    </StyledComponentsRegistry>
  )
}