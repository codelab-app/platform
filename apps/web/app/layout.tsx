'use client'

import '../styles/global.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { UrlParams } from '@codelab/frontend/abstract/application'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { createCoreStore } from '@codelab/frontend/infra/mobx'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import { guestUser } from '@codelab/shared/data/test'
import { App, ConfigProvider } from 'antd'
import { registerRootStore } from 'mobx-keystone'
import type { NextPage } from 'next'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import React, { type PropsWithChildren, Suspense, useState } from 'react'
import { CuiStoreProvider } from './components/provider'
import { theme } from './theme'

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <Suspense>
          {/* <CuiStoreProvider> */}
          <CuiStoreProvider>
            <UserProvider>
              <CuiProvider>
                <ConfigProvider theme={theme}>
                  <App className="size-full">{children}</App>
                </ConfigProvider>
              </CuiProvider>
            </UserProvider>
          </CuiStoreProvider>
          {/* </CuiStoreProvider> */}
        </Suspense>
      </body>
    </html>
  )
}

export default RootLayout
