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
import React, { useState } from 'react'
import { theme } from './theme'

const RootLayout = ({ children }: React.PropsWithChildren) => {
  // const [store] = useState(() => {
  //   const coreStore = createCoreStore(
  //     {
  //       param: {
  //         appSlug: params?.appSlug,
  //         componentSlug: params?.componentSlug,
  //         pageSlug: params?.pageSlug,
  //         userSlug: params?.userSlug,
  //       },
  //       query: {
  //         primarySidebarKey:
  //           searchParams?.get('primarySidebarKey') ?? undefined,
  //       },
  //     },
  //     guestUser,
  //   )

  //   registerRootStore(coreStore)

  //   return coreStore
  // })

  return (
    <html lang="en">
      <body>
        {/* <StoreProvider value={store}> */}
        <UserProvider>
          <CuiProvider>
            <AntdRegistry>
              <ConfigProvider theme={theme}>
                <App className="size-full">{children}</App>
              </ConfigProvider>
            </AntdRegistry>
          </CuiProvider>
        </UserProvider>
        {/* </StoreProvider> */}
      </body>
    </html>
  )
}

export default RootLayout
