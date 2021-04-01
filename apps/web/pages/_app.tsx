// import '../src/wdyr'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'
import { Global, css } from '@emotion/react'
import { ReactRelayContext } from 'react-relay'
import { AppProps } from 'next/app'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { Page } from '@codelab/frontend/shared'
import { useEnvironment } from '@codelab/frontend/relay'
import { LayoutFactory } from '../src/pages/LayoutFactory'
import { useApollo } from '@codelab/frontend/apollo'

// import '../src/styles/App.less'

const AppContainer: React.FC<AppProps> = ({ pageProps, Component, router }) => {
  const environment = useEnvironment(pageProps.initialRecords)

  return (
    <RecoilRoot>
      <ReactRelayContext.Provider value={{ environment }}>
        <ApolloProvider client={useApollo(pageProps)}>
          <UserProvider>
            <Global
              styles={css({
                '#__next': {
                  height: '100%',
                },
                body: {
                  overflow:
                    router.pathname === Page.PAGE_DETAIL.url
                      ? 'hidden'
                      : 'auto',
                },
              })}
            />
            <LayoutFactory router={router}>
              <Component {...pageProps} />
            </LayoutFactory>
          </UserProvider>
        </ApolloProvider>
      </ReactRelayContext.Provider>
    </RecoilRoot>
  )
}

export default AppContainer
