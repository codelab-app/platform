// import '../src/wdyr'
import { ApolloProvider } from '@apollo/client'
import { Global, css } from '@emotion/react'
import { AppProps } from 'next/app'
import { WithRouterProps } from 'next/dist/client/with-router'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { LayoutFactory } from '../src/templates/Layout'
import { LoginUserModal, RegisterUserModal } from '../src/useCases/user'
import { Page, useApollo } from '@codelab/frontend'
import './App.scss'

require('highlight.js/styles/monokai-sublime.css')
require('antd/dist/antd.css')
require('react-grid-layout/css/styles.css')
require('react-resizable/css/styles.css')

const App: React.FunctionComponent<WithRouterProps> = ({
  children,
  router,
}) => {
  return (
    <>
      <RegisterUserModal />
      <LoginUserModal />
      <LayoutFactory router={router}>{children}</LayoutFactory>
    </>
  )
}

const RootProviders = ({
  pageProps,
  children,
}: React.PropsWithChildren<{ pageProps: any }>) => (
  <RecoilRoot>
    <ApolloProvider client={useApollo(pageProps)}>
      {/* The Provider from react-dnd-multi-backend allows us to use both click and touch for drag and dropping */}
      {/* TODO remove react-dnd if we don't use it */}
      {/* <DndMultiProvider options={HTML5toTouch}>{children}</DndMultiProvider> */}
      {children}
    </ApolloProvider>
  </RecoilRoot>
)

const AppContainer: React.FC<AppProps> = ({ pageProps, Component, router }) => {
  return (
    <RootProviders pageProps={pageProps}>
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
      <App router={router}>
        <Component {...pageProps} />
      </App>
    </RootProviders>
  )
}

// ;(AppContainer as any).whyDidYouRender = true
// ;(App as any).whyDidYouRender = true

export default AppContainer
