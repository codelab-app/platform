import { PageType } from '@codelab/frontend/abstract/types'
import {
  TypesPrimarySidebar,
  TypesViewHeader,
} from '@codelab/frontend-application-type/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'
import React from 'react'

const TypesRouteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardTemplate
      Header={<TypesViewHeader />}
      PrimarySidebar={{
        default: PageType.Type,
        items: [
          {
            key: PageType.Type,
            render: <TypesPrimarySidebar />,
          },
        ],
      }}
    >
      {children}
    </DashboardTemplate>
  )
}

export default TypesRouteLayout
