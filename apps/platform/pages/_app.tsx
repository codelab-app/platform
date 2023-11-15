// import '../src/wdyr'
import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { IAppProps, IPageProps } from '@codelab/frontend/abstract/domain'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { initializeStore } from '@codelab/frontend/infra/mobx'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import { useTwindConfig } from '@codelab/frontend/shared/utils'
import { logDatetime } from '@codelab/shared/infra/logging'
import { App as AntdApp, ConfigProvider } from 'antd'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import config from '../twind.config'

const App = ({ Component, pageProps: { user } }: IAppProps<IPageProps>) => {
  logDatetime('_app.tsx')

  const router = useRouter()

  const store = useMemo(() => {
    if (!user) {
      return null
    }

    logDatetime('beforeInitStore')

    const _store = initializeStore({ routerQuery: router.query, user })

    logDatetime('afterInitStore')

    return _store
  }, [])

  const { Layout = ({ children }) => <>{children}</> } =
    Component as CodelabPage<object, object, object>

  // useTwindConfig(config)

  return (
    <StoreProvider value={store}>
      {/* <Analytics /> */}
      <UserProvider>
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
            <Layout>
              {(props) => (
                <AntdApp>
                  <Component {...props} />
                </AntdApp>
              )}
            </Layout>
          </ConfigProvider>
        </CuiProvider>
      </UserProvider>
    </StoreProvider>
  )
}

export default App
