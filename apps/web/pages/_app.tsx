import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { WithRouterProps } from 'next/dist/client/with-router'
import { NextRouter, useRouter } from 'next/router'
import * as R from 'ramda'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { Builder } from '../src/builder/Builder'
import { Dashboard } from '../src/dashboard/Dashboard'
import { HomeLayout } from '../src/home'
import { LoginUserModal, RegisterUserModal } from '../src/useCases/user'
import { PageType, isPage, mapProps, useApollo } from '@codelab/frontend'
import './App.scss'

require('highlight.js/styles/monokai-sublime.css')
require('antd/dist/antd.css')
require('react-grid-layout/css/styles.css')
require('react-resizable/css/styles.css')

export interface SharedPageProps {
  router: NextRouter
}

const withoutSidebar = (props: any) => ({ ...props, sidebar: { hide: true } })

const LayoutFactory: React.FunctionComponent<WithRouterProps> = R.cond([
  [isPage(PageType.Home), HomeLayout],
  [isPage(PageType.AppList), mapProps(withoutSidebar)(Dashboard)],
  [R.T, Builder],
])

const App: React.FunctionComponent<{}> = ({ children }) => {
  const router = useRouter()

  console.log('app')

  return (
    <>
      <RegisterUserModal />
      <LoginUserModal />
      <LayoutFactory router={router}>{children}</LayoutFactory>
    </>
  )
}

const AppContainer: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  const apolloClient = useApollo(pageProps)

  console.log('_app')

  return (
    <RecoilRoot>
      <ApolloProvider client={apolloClient}>
        <style jsx global>{`
          #__next {
            height: 100%;
          }
        `}</style>
        <App>
          <Component {...pageProps} />
        </App>
      </ApolloProvider>
    </RecoilRoot>
  )
}

export default AppContainer
