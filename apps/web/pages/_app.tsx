import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type {
  IAppProps,
  IPageProps,
} from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { createRootStore } from '@codelab/frontend/infra/mobx'
import { withTracerSpan } from '@codelab/frontend/infra/otel'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import { useTwindConfig } from '@codelab/frontend/shared/utils'
import { getEnv } from '@codelab/shared/config'
import { useDeepCompareMemo } from '@react-hookz/web'
import { App as AntdApp, ConfigProvider } from 'antd'
import { setGlobalConfig } from 'mobx-keystone'
import { useRouter } from 'next/router'
import React from 'react'
import config from '../twind.config'

setGlobalConfig({
  showDuplicateModelNameWarnings: process.env.NODE_ENV === 'production',
})

/**
 * Need to paste here for it to work with mobx
 */
if (getEnv().endpoint.isLocal) {
  console.log('Enable WDYR...')

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render')

  whyDidYouRender(React, {
    collapseGroups: true,
    // Exclude Ant Design components
    exclude: [/PopupContent/],
    // onlyLogs: true,
    titleColor: 'green',
    trackAllPureComponents: false,
  })
}

const App = ({ Component, pageProps }: IAppProps<IPageProps>) => {
  const router = useRouter()

  const store = useDeepCompareMemo(
    () => {
      return withTracerSpan('createRootStore', () =>
        createRootStore({
          router: {
            path: router.asPath,
            pathname: router.pathname,
            query: router.query,
          },
          user: pageProps.user,
        }),
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageProps.user],
  )

  const { Layout = React.Fragment } = Component as CodelabPage<object, object>

  useTwindConfig(config)

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
            <AntdApp className="size-full">
              <Layout>
                <Component />
              </Layout>
            </AntdApp>
          </ConfigProvider>
        </CuiProvider>
      </UserProvider>
    </StoreProvider>
  )
}

App.whyDidYouRender = true
export default App
