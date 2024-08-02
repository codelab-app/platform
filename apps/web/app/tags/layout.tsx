import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { TagsPrimarySidebar } from '@codelab/frontend-application-tag/use-cases/primary-sidebar'
import { TagsViewHeader } from '@codelab/frontend-application-tag/views'
import {
  DashboardTemplate,
  DynamicDashboardTemplate,
} from '@codelab/frontend-presentation-view/templates'
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
