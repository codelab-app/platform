import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import { DynamicDashboardTemplate } from '@codelab/frontend/presentation/view'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourcesPrimarySidebar } from '../use-cases'
import { ResourcesViewHeader } from './ResourcesViewheader'

export type ResourcesView = CodelabPage<DashboardTemplateProps>

export const ResourcesViewLayout: ResourcesView['Layout'] = observer(
  ({ children }) => {
    return (
      <DynamicDashboardTemplate
        Header={ResourcesViewHeader}
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
        {children()}
      </DynamicDashboardTemplate>
    )
  },
)
