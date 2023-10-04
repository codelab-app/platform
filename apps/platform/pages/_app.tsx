// import '../src/wdyr'
import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { IAppProps, IPageProps } from '@codelab/frontend/abstract/domain'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { CuiProvider } from '@codelab/frontend/presentation//codelab-ui'
import { initializeStore } from '@codelab/frontend/presentation/client/mobx'
import { StoreProvider } from '@codelab/frontend/presentation/container'
import install from '@twind/with-next/app'
import { ConfigProvider } from 'antd'
import React, { useMemo } from 'react'
import config from '../twind.config'

const App = ({ Component, pageProps: { user } }: IAppProps<IPageProps>) => {
  const store = useMemo(() => {
    if (!user) {
      return null
    }

install(config)

const App = ({ Component, pageProps }: IAppProps<IPageProps>) => {
  const store = useMemo(() => initializeStore(pageProps), [])

  const { Layout = ({ children }) => <>{children}</> } =
    Component as CodelabPage<object, object, object>

  return (
    <StoreProvider value={store}>
      {/* <Analytics /> */}
      <UserProvider>
        <CuiProvider>
          <ConfigProvider
            theme={{
              components: {
                Layout: {
                  colorBgHeader: '#ffffff',
                },
              },
              token: {
                // fontFamily: `'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                // 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
                // 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
              },
            }}
          >
            <Layout>{(props) => <Component {...props} />}</Layout>
          </ConfigProvider>
        </CuiProvider>
      </UserProvider>
    </StoreProvider>
  )
}

export default App
