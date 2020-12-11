import { AppProps } from 'next/app'
import React, { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { appMachine } from '../../../libs/ddd/modules/app-stories/src/model/store/machine-app'
import { useLayout } from '../../../libs/ddd/modules/layout-stories/src/useLayout'
import {
  AppModal,
  AppModalProps,
  MachineProvider,
} from '@codelab/ddd/modules/app-stories'
import { AppLayoutContainer } from '@codelab/ddd/modules/layout-stories'

import 'antd/dist/antd.css'
import 'highlight.js/styles/monokai-sublime.css'

const App = ({ children }: PropsWithChildren<any>) => {
  const layout = useLayout()

  const appModalProps: AppModalProps = {
    visible: layout.state.value.modal === 'active',
    onCancel: () => layout.send('TOGGLE_MODAL'),
    onOk: () => layout.send('TOGGLE_MODAL'),
  }

  return (
    <>
      <AppModal {...appModalProps}>
        <h1>Modal</h1>
      </AppModal>
      <AppLayoutContainer>{children}</AppLayoutContainer>
      {/* <AppLayout sidebar={sidebar} header={header} footer={footer}>
        {children}
      </AppLayout> */}
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
