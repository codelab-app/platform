import { AppProps } from 'next/app'
import React, { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { MachineProvider } from '@codelab/frontend'
import { appMachine } from '@codelab/modules/app-stories'
import { AppLayoutContainer } from '@codelab/modules/layout-stories'
import { ModalContainer } from '@codelab/modules/modal-stories'

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
          <ModalContainer />
          <AppLayoutContainer>{children}</AppLayoutContainer>
        </>
      )}
    </>
  )
}

const AppContainer: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return (
    <MachineProvider rootMachine={appMachine}>
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
    </MachineProvider>
  )
}

export default AppContainer
