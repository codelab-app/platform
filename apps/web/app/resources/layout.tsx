'use client'

import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  ResourcesPrimarySidebar,
  ResourcesViewHeader,
} from '@codelab/frontend-application-resource/views'
import type { DashboardTemplateProps } from '@codelab/frontend-presentation-view/templates'
import {
  DashboardTemplate,
  DynamicDashboardTemplate,
} from '@codelab/frontend-presentation-view/templates'
import { observer } from 'mobx-react-lite'
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
