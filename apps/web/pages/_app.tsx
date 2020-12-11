import { AppProps } from 'next/app'
import React, { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { useLayoutActor } from '../../../libs/ddd/modules/app-stories/src/model/store/machine-app'
import { AppModal, AppModalProps } from '@codelab/ddd/modules/app-stories'
import { AppLayoutContainer } from '@codelab/ddd/modules/layout-stories'

import 'antd/dist/antd.css'
import 'highlight.js/styles/monokai-sublime.css'

const App = ({ children }: PropsWithChildren<any>) => {
  const layout = useLayoutActor()

  console.log(layout.state.value.modal)

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
  )
}

export default AppContainer
