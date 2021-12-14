// import '../src/wdyr'
import '../src/styles/antd-theme.less'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import type { CodelabPage } from '@codelab/frontend/abstract/props'
import { useApollo } from '@codelab/frontend/model/infra/apollo'
import { reduxStoreWrapper } from '@codelab/frontend/model/infra/redux'
import { combineComponents } from '@codelab/frontend/shared/utils'
import { css, Global } from '@emotion/react'
import DateFnsAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GlobalStyles } from 'twin.macro'
import { globalTailwindFix } from '../src/styles/GlobalTailwindFix'

const queryClient = new QueryClient()

const AppProviders = combineComponents(
  [QueryClientProvider, { client: queryClient }],
  UserProvider,
  [LocalizationProvider, { dateAdapter: DateFnsAdapter }],
  ConfigProvider,
)

const AppContainer = ({
  // Props come from getServerSideProps
  pageProps: ssrPageProps,
  Component,
}: AppProps<any>) => {
  const { Template, templateProps, providers } = Component as CodelabPage<any>
  const client = useApollo(ssrPageProps)

  const Content = combineComponents(
    ...(providers ?? []),
    Template ? [Template, templateProps] : undefined,
    [Component, ssrPageProps],
  )

  return (
    <AppProviders>
      <ApolloProvider client={client}>
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
        <Content />
      </ApolloProvider>
    </AppProviders>
  )
}

export default reduxStoreWrapper.withRedux(AppContainer)
