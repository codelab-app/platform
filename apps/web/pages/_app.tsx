import { AppProps } from 'next/app'
import React, { PropsWithChildren } from 'react'
import { MachineProvider, rootMachine } from '@codelab/frontend'
import { CreateAppModal } from '@codelab/modules/app-stories'
import { AppLayoutContainer } from '@codelab/modules/layout-stories'
import {
  RegisterUserModal,
  UserLoginModal,
} from '@codelab/modules/user-stories'

require('highlight.js/styles/monokai-sublime.css')
require('antd/dist/antd.css')
require('react-grid-layout/css/styles.css')
require('react-resizable/css/styles.css')
require('../../../.storybook/grid.scss')

const App = ({ children }: PropsWithChildren<any>) => {
  return (
    <>
      {typeof window === 'undefined' ? null : (
        <>
          <RegisterUserModal />
          <UserLoginModal />
          <CreateAppModal />
          <AppLayoutContainer>{children}</AppLayoutContainer>
        </>
      )}
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
