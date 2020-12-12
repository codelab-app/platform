import { AppProps } from 'next/app'
import React, { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { AppModalContainer } from '../../../libs/ddd/modules/app-stories/src/view/AppModalContainer'
import { MachineProvider } from '@codelab/ddd/frontend'
import { appMachine } from '@codelab/ddd/modules/app-stories'
import { AppLayoutContainer } from '@codelab/ddd/modules/layout-stories'

require('highlight.js/styles/monokai-sublime.css')
require('antd/dist/antd.css')

const App = ({ children }: PropsWithChildren<any>) => {
  return (
    <>
      <AppModalContainer />
      <AppLayoutContainer>{children}</AppLayoutContainer>
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
