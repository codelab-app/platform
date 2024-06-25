import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { IAppProps } from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { useTwindConfig } from '@codelab/frontend/shared/utils'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { getEnv } from '@codelab/shared/config'
import { adminUser } from '@codelab/shared/data/test'
import { App as AntdApp, ConfigProvider } from 'antd'
import { setGlobalConfig } from 'mobx-keystone'
import React from 'react'
import { CuiProvider } from '../app/providers/CuiProvider'
import config from '../twind.config'

setGlobalConfig({
  showDuplicateModelNameWarnings: process.env.NODE_ENV === 'production',
})

/**
 * Need to paste here for it to work with mobx
 */
if (getEnv().endpoint.isLocal && getEnv().node.enableWdyr) {
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

const App = ({ Component, pageProps: { user = adminUser } }: IAppProps) => {
  const { params, query } = useUrl()
  /**
   * When possible, Fast Refresh attempts to preserve the state of your component between edits. In particular, useState and useRef preserve their previous values as long as you don't change their arguments or the order of the Hook calls.
   *
   * https://nextjs.org/docs/architecture/fast-refresh

  const [store] = useState(() => {
    const coreStore = createCoreStore(
      {
        params,
        query,
      },
      user,
    )

    registerRootStore(coreStore)

    return coreStore
  })

  useEffect(() => {
    store.routerService.update({
      params,
      query,
    })
  }, [params, query])

  */
  const { Layout = React.Fragment } = Component as CodelabPage<object, object>

  useTwindConfig(config)

  return (
    // <StoreProvider value={store}>
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
    // </StoreProvider>
  )
}

export default App
