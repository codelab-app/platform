import React from 'react'
import { useLayoutActor } from '../../app-stories/src/model/store/machine-app'
import { SidebarMenu } from '../../sidebar-stories/src/SidebarMenu'
import {
  AppFooterProps,
  AppHeaderProps,
  AppLayout,
  AppSidebarProps,
} from './AppLayout'
import { AppHeaderMenuProps, HeaderMenu } from '@codelab/modules/app-stories'
import {
  UserLoginButtonContainer,
  UserSignupButtonContainer,
} from '@codelab/modules/user-stories'

export const AppLayoutContainer = ({ children }: any) => {
  const layout = useLayoutActor()

  const sidebar: AppSidebarProps = {
    Menu: <SidebarMenu />,
    collapsed: layout.state.value.sidebar === 'inactive',
    onCollapse: () => layout.send('TOGGLE_SIDEBAR'),
  }

  const appHeaderMenuProps: AppHeaderMenuProps = {
    UserSignupButton: <UserSignupButtonContainer />,
    UserLoginButton: <UserLoginButtonContainer />,
  }

  const header: AppHeaderProps = {
    Menu: <HeaderMenu {...appHeaderMenuProps} />,
  }

  const footer: AppFooterProps = <span>Codelab.ai ©2020</span>

  return (
    <AppLayout sidebar={sidebar} header={header} footer={footer}>
      {children}
    </AppLayout>
  )
}
