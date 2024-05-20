import 'server-only'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  authGuardMenuItem,
  builderComponentsMenuItem,
  CuiNavigationSidebar,
  pageBuilderMenuItem,
  resourceMenuItem,
  sidebarWidth,
} from '@codelab/frontend/presentation/client-components'
import type { Nullish } from '@codelab/shared/abstract/types'
import Sider from 'antd/lib/layout/Sider'
import React from 'react'

export interface PageProps {
  params: {
    appSlug: Nullish<string>
    pageSlug: Nullish<string>
    componentSlug: Nullish<string>
    userSlug: Nullish<string>
  }
}

const NavigationSidebar: React.FC<PageProps> = ({
  params: { appSlug, componentSlug, pageSlug, userSlug },
}) => {
  const primaryItems = [
    appMenuItem,
    allPagesMenuItem(appSlug, pageSlug, userSlug),
    pageBuilderMenuItem(appSlug, pageSlug, componentSlug, userSlug),
    builderComponentsMenuItem(appSlug, pageSlug, componentSlug, userSlug),
    resourceMenuItem,
    authGuardMenuItem,
  ]

  return (
    <Sider collapsed collapsedWidth={sidebarWidth} theme="light">
      <CuiNavigationSidebar
        primaryItems={primaryItems}
        secondaryItems={adminMenuItems}
      />
    </Sider>
  )
}

export default NavigationSidebar
