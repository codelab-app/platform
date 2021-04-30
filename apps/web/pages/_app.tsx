// import '../src/wdyr'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import { css, Global } from '@emotion/react'
import { AppProps } from 'next/app'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { PageType } from '@codelab/frontend/shared'
import { useApollo } from '@codelab/frontend/apollo'
import '../src/styles/App.less'

const AppContainer = ({ pageProps, Component, router }: AppProps) => {
  const { Layout, MainPane } = Component as any

  return (
    <RecoilRoot>
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
            <Layout MainPane={MainPane}>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </UserProvider>
      </ApolloProvider>
    </RecoilRoot>
  )
}

export default AppContainer
