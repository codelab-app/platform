import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  AuthGuardsPrimarySidebar,
  AuthGuardsViewHeader,
} from '@codelab/frontend-application-auth-guard/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'
import React from 'react'

const AuthGuardsRouteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardTemplate
      Header={<AuthGuardsViewHeader />}
      PrimarySidebar={{
        default: ExplorerPaneType.AuthGuards,
        items: [
          {
            key: ExplorerPaneType.AuthGuards,
            render: <AuthGuardsPrimarySidebar />,
          },
        ],
      }}
    >
      {children}
    </DashboardTemplate>
  )
}

export default AuthGuardsRouteLayout
