// import '../src/wdyr'
import '../src/styles/app.scss'
import 'animate.css'
import '../src/styles/styles.chunk.css'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import type { CodelabPage } from '@codelab/frontend/abstract/props'
import { useApollo } from '@codelab/frontend/model/infra/apollo'
import { reduxStoreWrapper } from '@codelab/frontend/model/infra/redux'
import { css, Global } from '@emotion/react'
import DateFnsAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GlobalStyles } from 'twin.macro'
import { globalTailwindFix } from '../src/styles/GlobalTailwindFix'
import { slickCssFix } from '../src/styles/slick/Slick'

const queryClient = new QueryClient()

const App = ({ pageProps: getServerSideProps, Component }: AppProps<any>) => {
  const { Layout = ({ children }: any) => <>{children}</> } =
    Component as CodelabPage<any>

  const client = useApollo(getServerSideProps)

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <LocalizationProvider dateAdapter={DateFnsAdapter}>
          <ConfigProvider>
            <ApolloProvider client={client}>
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
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...getServerSideProps} />
              </Layout>
            </ApolloProvider>
          </ConfigProvider>
        </LocalizationProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default reduxStoreWrapper.withRedux(App)
