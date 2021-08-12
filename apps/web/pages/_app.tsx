// import '../src/wdyr'
import '../src/styles/App.less'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import { useApollo } from '@codelab/frontend/model/infra/apollo'
import { PageType } from '@codelab/frontend/model/state/router'
import { css, Global } from '@emotion/react'
import { AppProps } from 'next/app'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { GlobalStyles } from 'twin.macro'

const queryClient = new QueryClient()

const AppContainer = ({ pageProps, Component, router }: AppProps<any>) => {
  const { Template, Header, MainPane, MetaPane, SidebarNavigation } =
    Component as any

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={useApollo(pageProps)}>
          <UserProvider>
            <GlobalStyles />
            <Global
              styles={css({
                '#__next': {
                  height: '100%',
                },
                body: {
                  overflow:
                    router.pathname === PageType.PageDetail ? 'hidden' : 'auto',
                },
              })}
            />
            {Template ? (
              <Template
                MainPane={MainPane}
                MetaPane={MetaPane}
                SidebarNavigation={SidebarNavigation}
              >
                <Component {...pageProps} />
              </Template>
            ) : (
              <Component {...pageProps} />
            )}
          </UserProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default AppContainer
