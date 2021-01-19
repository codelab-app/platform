import { WithRouterProps } from 'next/dist/client/with-router'
import { useRouter } from 'next/router'
import React from 'react'
import {
  AppFooterProps,
  AppHeaderProps,
  AppLayout,
  AppSidebarProps,
} from './AppLayout'
import { HomeHeaderMenu } from '@codelab/modules/header-stories'
import { SidebarMenu } from '@codelab/modules/sidebar-stories'

export const AppLayoutContainer: React.FunctionComponent<WithRouterProps> = ({
  children,
}) => {
  const router = useRouter()

  const sidebar: AppSidebarProps = {
    Menu: <SidebarMenu />,
    collapsed: true,
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
