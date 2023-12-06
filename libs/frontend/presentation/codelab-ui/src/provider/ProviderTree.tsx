// import type { IAppProps, IPageProps } from '@codelab/frontend/abstract/domain'
import { useUser } from '@auth0/nextjs-auth0/client'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { initializeStore } from '@codelab/frontend/infra/mobx'
import { ConfigProvider, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { CuiProvider } from '../core'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const ProvidersTree = ({ children }) => {
  const router = useRouter()
  const { user } = useUser()

  const store = useMemo(() => {
    if (!user) {
      return null
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return initializeStore({ routerQuery: router.query, user })
  }, [user])

  console.log('user', user)

  if (!user) {
    return <Spin />
  }

  return (
    <StoreProvider value={store}>
      <CuiProvider>
        <ConfigProvider
          theme={{
            components: {
              Layout: {
                headerBg: '#ffffff',
              },
            },
            token: {
              // fontFamily: `'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              // 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
              // 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </CuiProvider>
    </StoreProvider>
  )
}

export default ProvidersTree
