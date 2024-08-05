'use client'

import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  ResourcesPrimarySidebar,
  ResourcesViewHeader,
} from '@codelab/frontend-application-resource/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import React, { type ReactNode } from 'react'

const ResourcesRouteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardTemplate
      Header={<ResourcesViewHeader />}
      PrimarySidebar={{
        default: ExplorerPaneType.ResourceList,
        items: [
          {
            key: ExplorerPaneType.ResourceList,
            render: <ResourcesPrimarySidebar />,
          },
        ],
      }}
    >
      {children}
    </DashboardTemplate>
  )
}

export default ResourcesRouteLayout
