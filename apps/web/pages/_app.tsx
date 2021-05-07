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

const AppContainer = ({ pageProps, Component, router }: AppProps) => {
  const { Layout, MainPane, MetaPane } = Component as any

  return (
    <RecoilRoot>
      <DgraphProvider client={dgraphClient}>
        <ApolloProvider client={useApollo(pageProps)}>
          <UserProvider>
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
            {Layout ? (
              <Layout MainPane={MainPane} MetaPane={MetaPane}>
                <Component {...pageProps} />
              </Layout>
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
