// import '../wdyr'
import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type {
  IAppProps,
  IPageProps,
} from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { StoreProvider } from '@codelab/frontend/application/shared/store'
import { initializeStore } from '@codelab/frontend/infra/mobx'
import { withTracerSpan } from '@codelab/frontend/infra/otel'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import { useTwindConfig } from '@codelab/frontend/shared/utils'
import { getEnv } from '@codelab/shared/config'
import { App as AntdApp, ConfigProvider } from 'antd'
import isBoolean from 'lodash/isBoolean'
import set from 'lodash/set'
import { setGlobalConfig } from 'mobx-keystone'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import config from '../twind.config'

setGlobalConfig({
  showDuplicateModelNameWarnings: process.env.NODE_ENV === 'production',
})

/**
 * Need to paste here for it to work with mobx
 */
if (
  getEnv().endpoint.isLocal &&
  isBoolean(process.env['NEXT_WEB_ENABLE_WDYR'])
) {
  console.log('Enable WDYR...')

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render')

  whyDidYouRender(React, {
    collapseGroups: true,
    // Exclude Ant Design components
    exclude: [/PopupContent/],
    // onlyLogs: true,
    titleColor: 'green',
    trackAllPureComponents: true,
  })
}

const App = ({ Component, pageProps: { user } }: IAppProps<IPageProps>) => {
  const router = useRouter()

  const store = useMemo(() => {
    if (!user) {
      return null
    }

    return withTracerSpan('initializeStore', () =>
      initializeStore({
        router: {
          path: router.asPath,
          pathname: router.pathname,
          query: router.query,
        },
        user,
      }),
    )
  }, [user?.sid])

  const { Layout = ({ children }) => <>{children}</> } =
    Component as CodelabPage<object, object, object>

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

export default App
