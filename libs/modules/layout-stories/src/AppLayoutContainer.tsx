import { useRouter } from 'next/router'
import React from 'react'
import {
  AppFooterProps,
  AppHeaderProps,
  AppLayout,
  AppSidebarProps,
} from './AppLayout'
import { useLayoutMachine } from './useLayoutMachine'
import { HeaderMenu } from '@codelab/modules/header-stories'
import { SidebarMenu } from '@codelab/modules/sidebar-stories'

export const AppLayoutContainer = ({ children }: any) => {
  const layout = useLayoutMachine()
  const router = useRouter()

  const sidebar: AppSidebarProps = {
    hidden: router.asPath === '/',
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
