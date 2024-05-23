'use client'

import { CuiV2NavigationBar } from '@codelab/frontend/presentation/codelab-ui'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  authGuardMenuItem,
  builderComponentsMenuItem,
  pageBuilderMenuItem,
  resourceMenuItem,
} from '@codelab/frontend-presentation-view/sections'
import { sidebarWidth } from '@codelab/frontend-presentation-view/templates'
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
      <CuiV2NavigationBar
        primaryItems={primaryItems}
        secondaryItems={adminMenuItems}
      />
    </Sider>
  )
}

export default NavigationSidebar
