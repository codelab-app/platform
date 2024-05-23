import '../styles/global.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { UrlParams } from '@codelab/frontend/abstract/application'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { createCoreStore } from '@codelab/frontend/infra/mobx'
import { guestUser } from '@codelab/shared/data/test'
import { App, ConfigProvider } from 'antd'
import { registerRootStore } from 'mobx-keystone'
import type { NextPage } from 'next'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { theme } from './theme'

const RootLayout = async ({ children }: React.PropsWithChildren) => {
  const params = useParams<UrlParams>()
  const searchParams = useSearchParams()

  const store = createCoreStore(
    {
      param: {
        appSlug: params?.appSlug,
        componentSlug: params?.componentSlug,
        pageSlug: params?.pageSlug,
        userSlug: params?.userSlug,
      },
      query: {
        primarySidebarKey: searchParams?.get('primarySidebarKey'),
      },
    },
    guestUser,
  )

  registerRootStore(store)

  return (
    <html lang="en">
      <body>
        <StoreProvider value={store}>
          <UserProvider>
            <AntdRegistry>
              <ConfigProvider theme={theme}>
                <App className="size-full">{children}</App>
              </ConfigProvider>
            </AntdRegistry>
          </UserProvider>
        </StoreProvider>
      </body>
    </html>
  )
}

export default RootLayout
