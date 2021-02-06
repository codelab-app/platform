import '../src/wdyr'
import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { WithRouterProps } from 'next/dist/client/with-router'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { LayoutFactory } from '../src/layout/Layout'
import { LoginUserModal, RegisterUserModal } from '../src/useCases/user'
import { useApollo } from '@codelab/frontend'
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

const AppContainer: React.FC<AppProps> = ({ pageProps, Component, router }) => {
  return (
    <RecoilRoot>
      <ApolloProvider client={useApollo(pageProps)}>
        <style jsx global>{`
          #__next {
            height: 100%;
          }
        `}</style>
        <App router={router}>
          <Component {...pageProps} />
        </App>
      </ApolloProvider>
    </RecoilRoot>
  )
}

;(AppContainer as any).whyDidYouRender = true
;(App as any).whyDidYouRender = true

export default AppContainer
