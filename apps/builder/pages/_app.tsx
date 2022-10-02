// import '../src/wdyr'
import 'reflect-metadata'
// import '../src/styles/antd-theme.less'
import 'react-quill/dist/quill.snow.css'
// This stylesheet is used to override some of the default Quill editor's styles.
import '../src/styles/quill.snow.override.css'
// https://www.elvisduru.com/blog/how-to-customize-ant-design-theme-in-nextjs
import { UserProvider } from '@auth0/nextjs-auth0'
import { IAppProps } from '@codelab/frontend/abstract/core'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import { StoreProvider } from '@codelab/frontend/presenter/container'
import { css, Global } from '@emotion/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ConfigProvider } from 'antd'
import React, { PropsWithChildren, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { GlobalStyles } from 'twin.macro'
import { globalTailwindFix } from '../src/styles/GlobalTailwindFix'
import { slickCssFix } from '../src/styles/slick/Slick'

/**
 * Using snapshot isn't very performant, instead we load data on client side
 */
const queryClient = new QueryClient()

const App = ({ pageProps, Component }: IAppProps) => {
  const store = useMemo(() => initializeStore(pageProps), [])

  const { Layout = ({ children }: PropsWithChildren) => <>{children}</> } =
    Component as CodelabPage<unknown>

  return (
    <StoreProvider value={store}>
      <RecoilRoot>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ConfigProvider>
                <GlobalStyles />
                <Global
                  styles={[
                    css({
                      '#__next': {
                        height: '100%',
                      },
                    }),
                    slickCssFix,
                    ...globalTailwindFix,
                  ]}
                />
                <Layout>
                  <Component
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...pageProps}
                  />
                </Layout>
              </ConfigProvider>
            </LocalizationProvider>
          </QueryClientProvider>
        </UserProvider>
      </RecoilRoot>
    </StoreProvider>
  )
}

App.displayName = 'App'

export default App
