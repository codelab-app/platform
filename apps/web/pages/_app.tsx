// import '../src/wdyr'
import 'reflect-metadata'
import '../src/styles/app.css'
import 'animate.css'
import '../src/styles/styles.chunk.css'
import { UserProvider } from '@auth0/nextjs-auth0'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  initializeStore,
  StoreProvider,
} from '@codelab/frontend/model/infra/mobx'
import { css, Global } from '@emotion/react'
import DateFnsAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { ConfigProvider } from 'antd'
import { AppProps } from 'next/app'
import React, { PropsWithChildren, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GlobalStyles } from 'twin.macro'
import { reduxStoreWrapper } from '../src/store/reduxStoreWrapper'
import { globalTailwindFix } from '../src/styles/GlobalTailwindFix'
import { slickCssFix } from '../src/styles/slick/Slick'

/**
 * Pass { snapshot: getSnapshot(store) } as props from any getServerSideProps to pre-populate the store
 */

const queryClient = new QueryClient()

const App = ({ pageProps, Component, ...props }: AppProps<unknown>) => {
  const store = useMemo(
    () => initializeStore(pageProps.snapshot),
    [pageProps.snapshot],
  )

  const {
    Layout = ({ children }: PropsWithChildren<unknown>) => <>{children}</>,
  } = Component as CodelabPage<unknown>

  return (
    <StoreProvider value={store}>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={DateFnsAdapter}>
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
    </StoreProvider>
  )
}

export default reduxStoreWrapper.withRedux(App)
