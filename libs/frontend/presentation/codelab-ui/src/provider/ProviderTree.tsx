// import type { IAppProps, IPageProps } from '@codelab/frontend/abstract/domain'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { initializeStore } from '@codelab/frontend/infra/mobx'
// import { useTwindConfig } from '@codelab/frontend/shared/utils'
import { ConfigProvider } from 'antd'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
// import config from '../twind.config'
import { CuiProvider } from '../core'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const ProvidersTree = ({ children, user }) => {
  const router = useRouter()
  // const { user } = useUser()

  console.log('user', user)

  const store = useMemo(() => {
    if (!user) {
      return null
    }

    return initializeStore({ routerQuery: router.query, user })
  }, [user])

  // useTwindConfig(config)

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
