import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend-presentation-view/templates'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourcesPrimarySidebar } from '../use-cases/primary-sidebar'
import { ResourcesViewHeader } from './ResourcesViewHeader'

export type IResourcesView = CodelabPage<DashboardTemplateProps>

export const ResourcesViewLayout: IResourcesView['Layout'] = observer(
  ({ children }) => {
    return (
      <DynamicDashboardTemplate
        Header={<ResourcesViewHeader />}
        PrimarySidebar={{
          default: ExplorerPaneType.ResourceList,
          items: [
            {
              key: ExplorerPaneType.ResourceList,
              render: ResourcesPrimarySidebar,
            },
          ],
        }}
      >
        {children}
      </DynamicDashboardTemplate>
    )
  },
)
