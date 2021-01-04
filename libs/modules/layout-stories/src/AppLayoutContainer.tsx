import React from 'react'
import {
  AppFooterProps,
  AppHeaderProps,
  AppLayout,
  AppSidebarProps,
} from './AppLayout'
import { HeaderMenu, useLayoutActor } from '@codelab/modules/app-stories'
import { SidebarMenu } from '@codelab/modules/sidebar-stories'

export const AppLayoutContainer = ({ children }: any) => {
  const layout = useLayoutActor()

  const sidebar: AppSidebarProps = {
    Menu: <SidebarMenu />,
    collapsed: layout.state.value.sidebar === 'inactive',
    onCollapse: () => layout.send('TOGGLE_SIDEBAR'),
  }

  const header: AppHeaderProps = {
    Menu: <HeaderMenu />,
  }

  const footer: AppFooterProps = <span>Codelab.ai ©2020</span>

  return (
    <AppLayout sidebar={sidebar} header={header} footer={footer}>
      {children}
    </AppLayout>
  )
}
