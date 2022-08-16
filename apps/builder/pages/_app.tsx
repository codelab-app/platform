// import '../src/wdyr'
import 'reflect-metadata'
import '../src/styles/antd-theme.less'
// This stylesheet is used to customize some of the default Quill editor's styles.
import '../src/styles/quill.snow.custom.css'
// https://www.elvisduru.com/blog/how-to-customize-ant-design-theme-in-nextjs
import { UserProvider } from '@auth0/nextjs-auth0'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import { StoreProvider } from '@codelab/frontend/presenter/container'
import { IAppProps } from '@codelab/shared/abstract/core'
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

//
/**
 * Pass { snapshot: getSnapshot(store) } as props from any getServerSideProps to pre-populate the store
 */
const queryClient = new QueryClient()

const App = ({ pageProps, Component }: IAppProps) => {
  const store = useMemo(
    () => initializeStore(pageProps),
    [pageProps.snapshot, pageProps.user],
  )

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
