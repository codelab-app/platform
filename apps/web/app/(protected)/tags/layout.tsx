'use client'

import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  TagsPrimarySidebar,
  TagsViewHeader,
} from '@codelab/frontend-application-tag/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'
import React from 'react'

const TagsRouteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardTemplate
      Header={<TagsViewHeader />}
      PrimarySidebar={{
        default: ExplorerPaneType.Tag,
        items: [{ key: ExplorerPaneType.Tag, render: <TagsPrimarySidebar /> }],
      }}
    >
      {children}
    </DashboardTemplate>
  )
}

export default TagsRouteLayout
