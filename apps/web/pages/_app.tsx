// import '../src/wdyr'
import '../src/styles/App.less'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import { useApollo } from '@codelab/frontend/apollo'
import { dgraphClient, DgraphProvider } from '@codelab/frontend/dgraph'
import { PageType } from '@codelab/frontend/shared'
import { css, Global } from '@emotion/react'
import { AppProps } from 'next/app'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { GlobalStyles } from 'twin.macro'

const AppContainer = ({ pageProps, Component, router }: AppProps<any>) => {
  const { Template, MainPane, MetaPane, SidebarNavigation } = Component as any

  return (
    <RecoilRoot>
      <DgraphProvider client={dgraphClient}>
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
      </DgraphProvider>
    </RecoilRoot>
  )
}

export default AppContainer
