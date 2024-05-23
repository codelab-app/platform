'use client'

import type { UrlParams } from '@codelab/frontend/abstract/application'
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
import { useParams } from 'next/navigation'
import React from 'react'

/**
 * Can't seem to pass props to slots
 *
 * https://github.com/vercel/next.js/discussions/58016
 */
const NavigationSidebar: React.FC = () => {
  const params = useParams<Required<UrlParams>>()
  const appSlug = params?.appSlug
  const pageSlug = params?.pageSlug
  const userSlug = params?.userSlug
  const componentSlug = params?.componentSlug

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
