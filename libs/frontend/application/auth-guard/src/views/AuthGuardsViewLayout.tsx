import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend-presentation-view/templates'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AuthGuardsPrimarySidebar } from '../use-cases'
import { AuthGuardsViewHeader } from './AuthGuardsViewHeader'

export type AuthGuardsView = CodelabPage<DashboardTemplateProps>

export const AuthGuardsViewLayout: AuthGuardsView['Layout'] = observer(
  ({ children }) => {
    return (
      <DynamicDashboardTemplate
        Header={AuthGuardsViewHeader}
        PrimarySidebar={{
          default: ExplorerPaneType.AuthGuards,
          items: [
            {
              key: ExplorerPaneType.AuthGuards,
              render: AuthGuardsPrimarySidebar,
            },
          ],
        }}
      >
        {children}
      </DynamicDashboardTemplate>
    )
  },
)
