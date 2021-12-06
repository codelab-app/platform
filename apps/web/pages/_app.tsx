// import '../src/wdyr'
import '../src/styles/antd-theme.less'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import { useApollo } from '@codelab/frontend/model/infra/apollo'
import { reduxStoreWrapper } from '@codelab/frontend/model/infra/redux'
import { css, Global } from '@emotion/react'
import DateFnsAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { ConfigProvider } from 'antd'
import { AppProps } from 'next/app'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GlobalStyles } from 'twin.macro'
import { globalTailwindFix } from '../src/styles/GlobalTailwindFix'

const queryClient = new QueryClient()

const AppContainer = ({
  // Props come from getServerSideProps
  pageProps: ssrPageProps,
  Component,
}: AppProps<any>) => {
  const { Template, Header, MainPane, MetaPane, SidebarNavigation } =
    Component as CodelabPage

  const _Header = Header ? () => <Header {...ssrPageProps} /> : null
  const _MainPane = MainPane ? () => <MainPane {...ssrPageProps} /> : null
  const _MetaPane = MetaPane ? () => <MetaPane {...ssrPageProps} /> : null

  const _SidebarNavigation = SidebarNavigation
    ? () => <SidebarNavigation {...ssrPageProps} />
    : null

  const client = useApollo(ssrPageProps)

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={useApollo(ssrPageProps)}>
        <UserProvider>
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
                  ...globalTailwindFix,
                ]}
              />
              {Template ? (
                <Template
                  MainPane={_MainPane}
                  MetaPane={_MetaPane}
                  SidebarNavigation={_SidebarNavigation}
                  Header={_Header}
                >
                  <Component {...ssrPageProps} />
                </Template>
              ) : (
                <Component {...ssrPageProps} />
              )}
            </ConfigProvider>
          </LocalizationProvider>
        </UserProvider>
      </ApolloProvider>
    </QueryClientProvider>
  )
}

export default reduxStoreWrapper.withRedux(AppContainer)
