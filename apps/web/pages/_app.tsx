import { AppProps } from 'next/app'
import React, { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import {
  AppFooterProps,
  AppHeaderMenu,
  AppHeaderMenuProps,
  AppHeaderProps,
  AppLayout,
  AppModal,
  AppModalProps,
  AppSidebarMenu,
  AppSidebarProps,
  useAppMachine,
} from '@codelab/ddd/modules/app-stories'
import { UserSignupButton } from '@codelab/ddd/modules/users-stories'

import 'antd/dist/antd.css'
import 'highlight.js/styles/monokai-sublime.css'

const App = ({ children }: PropsWithChildren<any>) => {
  const [appMachineState, appSend] = useAppMachine() as any

  // const app = useRecoilValue(appMachineAtom)
  // const [appMachineState, appSend] = useMachine(app)

  const sidebar: AppSidebarProps = {
    Menu: <AppSidebarMenu />,
    // collapsed: appMachineState.value.sidebar === 'inactive',
    onCollapse: () => appSend('TOGGLE_SIDEBAR'),
  }

  const appHeaderMenuProps: AppHeaderMenuProps = {
    UserSignupButton: <UserSignupButton />,
  }

  const header: AppHeaderProps = {
    Menu: <AppHeaderMenu {...appHeaderMenuProps} />,
  }

  const footer: AppFooterProps = <span>Codelab.ai ©2020</span>

  const appModalProps: AppModalProps = {
    // visible: appMachineState.value.modal === 'active',
    onCancel: () => appSend('TOGGLE_MODAL'),
    onOk: () => appSend('TOGGLE_MODAL'),
  }

  return (
    <>
      <AppModal {...appModalProps}>
        <h1>Modal</h1>
      </AppModal>
      <AppLayout sidebar={sidebar} header={header} footer={footer}>
        {children}
      </AppLayout>
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
