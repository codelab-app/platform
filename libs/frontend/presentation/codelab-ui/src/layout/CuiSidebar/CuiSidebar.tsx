'use client'

import type { UiKey } from '@codelab/frontend/abstract/types'
import type { ReactNode } from 'react'
import React, { useRef } from 'react'
import type { CuiSidebarToolbarProps } from '../../views'
import { CuiSidebarPopoverLayout } from '../CuiSidebarPopover'
import { CuiSidebarLayout } from './layout/CuiSidebarLayout'
import { CuiSidebarBody } from './views/CuiSidebarBody'
import { CuiSidebarHeader } from './views/CuiSidebarHeader'

export interface CuiSidebarView {
  content: React.ReactNode
  isLoading?: boolean
  key: string
  label: string
  toolbar?: CuiSidebarToolbarProps
}

export interface CuiSidebarProps {
  defaultActiveViewKeys?: Array<string>
  // This is to override the header's label
  label: string
  popover?: ReactNode

  // tabs?: Array<CuiSidebarTab>
  uiKey: UiKey
  /**
   * If we only have 1 view, we make it a non-accordion style and make it the main header
   *
   * If we have more than 1 view, it becomes accordion style
   */
  views: Array<CuiSidebarView>
}

/**
 * We conditionally render the sidebar based on how many views we have.
 *
 * If there is only 1 view, we render a toolbar header and collapse body separately
 *
 * If there is more than 1 view, we use the collapse header & body
 */
export const CuiSidebar = ({
  defaultActiveViewKeys,
  label,
  popover,
  uiKey,
  views,
}: CuiSidebarProps) => {
  const popoverAnchorRef = useRef<HTMLDivElement>(null)
  const toolbar = views.length === 1 ? views[0]?.toolbar : undefined

  return (
    <CuiSidebarLayout popoverAnchorRef={popoverAnchorRef} uiKey={uiKey}>
      <CuiSidebarHeader label={label} toolbar={toolbar} />
      <CuiSidebarBody
        defaultActiveViewKeys={defaultActiveViewKeys}
        views={views}
      />
      <CuiSidebarPopoverLayout popoverAnchorRef={popoverAnchorRef}>
        {popover}
      </CuiSidebarPopoverLayout>
    </CuiSidebarLayout>
  )
}
