import { WithRouterProps } from 'next/dist/client/with-router'
import { useRouter } from 'next/router'
import React from 'react'
import {
  AppFooterProps,
  AppHeaderProps,
  AppLayout,
  AppSidebarProps,
} from './AppLayout'
import { useLayoutMachine } from './useLayoutMachine'
import { HomeHeaderMenu } from '@codelab/modules/header-stories'
import { SidebarMenu } from '@codelab/modules/sidebar-stories'

export const AppLayoutContainer: React.FunctionComponent<WithRouterProps> = ({
  children,
}) => {
  const layout = useLayoutMachine()
  const router = useRouter()

  const sidebar: AppSidebarProps = {
    hidden: router.asPath === '/',
    Menu: <SidebarMenu />,
    collapsed: true,
    // collapsed: layout.state.value.sidebar === 'inactive',
    // onCollapse: () => layout.send('TOGGLE_SIDEBAR'),
  }

  const header: AppHeaderProps = {
    Menu: <HomeHeaderMenu />,
  }

  const footer: AppFooterProps = <span>Codelab.ai ©2020</span>

  return (
    <AppLayout sidebar={sidebar} header={header} footer={footer}>
      {children}
    </AppLayout>
  )
}
