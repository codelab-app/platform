import { AppProps } from 'next/app'
import React, { PropsWithChildren } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { MachineProvider } from '@codelab/frontend'
import { appMachine } from '@codelab/modules/app-stories'
import { AppLayoutContainer } from '@codelab/modules/layout-stories'
import { ModalContainer } from '@codelab/modules/modal-stories'

require('highlight.js/styles/monokai-sublime.css')
require('antd/dist/antd.css')

const App = ({ children }: PropsWithChildren<any>) => {
  return (
    <>
      <ModalContainer />
      <AppLayoutContainer>{children}</AppLayoutContainer>
    </>
  )
}

const AppContainer: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return (
    <MachineProvider rootMachine={appMachine}>
      <Router>
        <RecoilRoot>
          <style jsx global>{`
            #__next {
              height: 100%;
            }
          `}</style>
          <App>
            <Component {...pageProps} />
          </App>
        </RecoilRoot>
      </Router>
    </MachineProvider>
  )
}

export default AppContainer
