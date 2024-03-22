// import '../wdyr'
import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { IAppProps, IPageProps } from '@codelab/frontend/abstract/domain'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { initializeStore } from '@codelab/frontend/infra/mobx'
import {
  initializeRelicAgent,
  initializeWebTraceProvider,
} from '@codelab/frontend/infra/otel'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import { useTwindConfig } from '@codelab/frontend/shared/utils'
import { trace } from '@opentelemetry/api'
import { App as AntdApp, ConfigProvider } from 'antd'
import set from 'lodash/set'
import { setGlobalConfig } from 'mobx-keystone'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import config from '../twind.config'

setGlobalConfig({
  showDuplicateModelNameWarnings: process.env.NODE_ENV === 'production',
})

const fetchGithubStars = async () => {
  const provider = initializeWebTraceProvider()

  return provider
    .getTracer('nextjs-example')
    .startActiveSpan('fetchGithubStars', (span) => {
      console.log('fetchGithubStars')
      span.end()
    })
}

// void initializeRelicAgent()

const App = ({ Component, pageProps: { user } }: IAppProps<IPageProps>) => {
  const router = useRouter()

  const store = useMemo(() => {
    if (!user) {
      return null
    }

    return initializeStore({ routerQuery: router.query, user })
  }, [user])

  // So we can access in Cypress
  if (typeof window !== 'undefined' && window.Cypress) {
    set(window, '__store__', store)
  }

  void fetchGithubStars()

  const { Layout = ({ children }) => <>{children}</> } =
    Component as CodelabPage<object, object, object>

  useTwindConfig(config)

  const LayoutContent = (props: object | undefined) => (
    <AntdApp className="size-full">
      <Component {...props} />
    </AntdApp>
  )

  return (
    <StoreProvider value={store}>
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
              {LayoutContent}
              {/* {(props) => (
                <AntdApp className="size-full">
                  <Component {...props} />
                </AntdApp>
              )} */}
            </Layout>
          </ConfigProvider>
        </CuiProvider>
      </UserProvider>
    </StoreProvider>
  )
}

export default App
