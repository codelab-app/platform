import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  AtomsPrimarySidebar,
  AtomsViewHeader,
} from '@codelab/frontend-application-atom/views'
import type { DashboardTemplateProps } from '@codelab/frontend-presentation-view/templates'
import {
  DashboardTemplate,
  DynamicDashboardTemplate,
} from '@codelab/frontend-presentation-view/templates'
import React, { type ReactNode } from 'react'

const AtomsRouteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardTemplate
      Header={<AtomsViewHeader />}
      PrimarySidebar={{
        default: PageType.Atoms,
        items: [
          {
            key: PageType.Atoms,
            render: <AtomsPrimarySidebar />,
          },
        ],
      }}
    >
      {children}
    </DashboardTemplate>
  )
}

export default AtomsRouteLayout
