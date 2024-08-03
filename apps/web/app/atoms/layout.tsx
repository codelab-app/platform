'use client'

import { PageType } from '@codelab/frontend/abstract/types'
import {
  AtomsPrimarySidebar,
  AtomsViewHeader,
} from '@codelab/frontend-application-atom/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
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
