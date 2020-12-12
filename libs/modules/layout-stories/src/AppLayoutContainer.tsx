import React from 'react'
import { useLayoutActor } from '../../app-stories/src/model/store/machine-app'
import { AppSidebarMenu } from '../../app-stories/src/view/AppSidebarMenu'
import {
  AppFooterProps,
  AppHeaderProps,
  AppLayout,
  AppSidebarProps,
} from './AppLayout'
import { AppHeaderMenu, AppHeaderMenuProps } from '@codelab/modules/app-stories'
import { UserSignupButton } from '@codelab/modules/users-stories'

export const AppLayoutContainer = ({ children }: any) => {
  const layout = useLayoutActor()

  const sidebar: AppSidebarProps = {
    Menu: <AppSidebarMenu />,
    collapsed: layout.state.value.sidebar === 'inactive',
    onCollapse: () => layout.send('TOGGLE_SIDEBAR'),
  }

  const appHeaderMenuProps: AppHeaderMenuProps = {
    UserSignupButton: <UserSignupButton />,
  }

  const header: AppHeaderProps = {
    Menu: <AppHeaderMenu {...appHeaderMenuProps} />,
  }

  const footer: AppFooterProps = <span>Codelab.ai ©2020</span>

  return (
    <AppLayout sidebar={sidebar} header={header} footer={footer}>
      {children}
    </AppLayout>
  )
}
