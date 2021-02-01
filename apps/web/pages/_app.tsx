import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { WithRouterProps } from 'next/dist/client/with-router'
import { NextRouter, useRouter } from 'next/router'
import * as R from 'ramda'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { DashboardLayout } from '../src/dashboard/Dashboard-layout'
import { HomeLayout } from '../src/home'
import { LoginUserModal, RegisterUserModal } from '../src/user'
import { useCurrentUser } from '../src/user/useCurrentUser'
import { useGetMe } from '../src/user/useGetMe'
import {
  MachineProvider,
  PageType,
  getApolloClient,
  isPage,
  mapProps,
  rootMachine,
} from '@codelab/frontend'
import './App.less'
import './App.scss'

require('highlight.js/styles/monokai-sublime.css')
require('react-grid-layout/css/styles.css')
require('react-resizable/css/styles.css')

export interface SharedPageProps {
  router: NextRouter
}

const withoutSidebar = (props: any) => ({ ...props, sidebar: { hide: true } })

const LayoutFactory: React.FunctionComponent<WithRouterProps> = R.cond([
  [isPage(PageType.Home), HomeLayout],
  [isPage(PageType.AppList), mapProps(withoutSidebar)(DashboardLayout)],
  [R.T, DashboardLayout],
])

const App: React.FunctionComponent<{}> = ({ children }) => {
  const router = useRouter()

  const currentUser = useCurrentUser()

  return (
    <>
      {!currentUser && (
        // No need to include modals if we are logged in
        <>
          <RegisterUserModal />
          <LoginUserModal />
        </>
      )}
      <LayoutFactory router={router}>{children}</LayoutFactory>
    </>
  )
}

// Use this component as a proxy to use the RecoilRoot provider, since we can't do that in AppContainer
const AppUserProxy: React.FC<{ pageProps: any }> = ({ pageProps }) => {
  // Fetch the current user's data. Use any getMe SSR query data if we have one in the pageProps
  // That way we can automatically get the current user if we use withAuthGuardServerSideProps or withAuthServerSideProps
  // If it's missing, useGetMe will make the getMe query, fetch the current user's data and put it in the userState
  useGetMe(pageProps?.data?.getMe)

  return <></>
}

const AppContainer: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return (
    <RecoilRoot>
      <ApolloProvider client={getApolloClient()}>
        <MachineProvider rootMachine={rootMachine}>
          <style jsx global>{`
            #__next {
              height: 100%;
            }
          `}</style>
          <App>
            <AppUserProxy pageProps={pageProps} />
            <Component {...pageProps} />
          </App>
        </MachineProvider>
      </ApolloProvider>
    </RecoilRoot>
  )
}

export default AppContainer
