// import '../src/wdyr'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import { Global, css } from '@emotion/react'
import { AppProps } from 'next/app'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { Page } from '@codelab/frontend/shared'
import { LayoutFactory } from '../src/pages/LayoutFactory'
import { useApollo } from '@codelab/frontend/apollo'
import '../src/styles/App.less'

const AppContainer = ({ pageProps, Component, router }: AppProps) => {
  // const environment = useEnvironment({})
  // const preloadedQuery = loadQuery(environment, GetUserQuery, {})

  return (
    <RecoilRoot>
      {/* <RelayEnvironmentProvider environment={environment}> */}
      <ApolloProvider client={useApollo(pageProps)}>
        <UserProvider>
          <Global
            styles={css({
              '#__next': {
                height: '100%',
              },
              body: {
                overflow:
                  router.pathname === Page.PAGE_DETAIL.url ? 'hidden' : 'auto',
              },
            })}
          />
          <LayoutFactory router={router}>
            {/* <Suspense fallback={<Spin />}> */}
            <Component {...pageProps} />
            {/* </Suspense> */}
          </LayoutFactory>
        </UserProvider>
      </ApolloProvider>
      {/* </RelayEnvironmentProvider> */}
    </RecoilRoot>
  )
}

export default AppContainer
