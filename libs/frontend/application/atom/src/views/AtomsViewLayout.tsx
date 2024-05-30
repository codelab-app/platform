import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageType } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend-presentation-view/templates'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import React from 'react'
import { AtomsPrimarySidebar } from '../use-cases/get-atoms'
import { AtomsViewHeader } from './AtomsViewHeader'

export type IAtomsView = CodelabPage<DashboardTemplateProps>

export const AtomsViewLayout: IAtomsView['Layout'] = ({ children }) => {
  return (
    <DynamicDashboardTemplate
      Header={AtomsViewHeader}
      PrimarySidebar={{
        default: PageType.Atoms,
        items: [
          {
            key: PageType.Atoms,
            render: AtomsPrimarySidebar,
          },
        ],
      }}
    >
      {children}
    </DynamicDashboardTemplate>
  )
}
