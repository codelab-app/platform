import { AppProps } from 'next/app'
import React, { PropsWithChildren } from 'react'
import { MachineProvider, rootMachine } from '@codelab/frontend'
import { CreateAppModal } from '@codelab/modules/app-stories'
import { AppLayoutContainer } from '@codelab/modules/layout-stories'
import {
  LoginUserModal,
  RegisterUserModal,
} from '@codelab/modules/user-stories'
import './App.less'
import './App.scss'

require('highlight.js/styles/monokai-sublime.css')
require('react-grid-layout/css/styles.css')
require('react-resizable/css/styles.css')

const App = ({ children }: PropsWithChildren<any>) => {
  return (
    <>
      <RegisterUserModal />
      <LoginUserModal />
      <CreateAppModal />
      <AppLayoutContainer>{children}</AppLayoutContainer>
    </>
  )
}

const AppContainer: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return (
    <MachineProvider rootMachine={rootMachine}>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
      `}</style>
      <App>
        <Component {...pageProps} />
      </App>
    </MachineProvider>
  )
}

export default AppContainer
