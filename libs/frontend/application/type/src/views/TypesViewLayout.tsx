import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { PageType } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend-presentation-view/templates'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { TypesPrimarySidebar } from '../use-cases/primary-sidebar'
import { TypesViewHeader } from './TypesViewHeader'

export type ITypesView = CodelabPage<DashboardTemplateProps>

export const TypesViewLayout: ITypesView['Layout'] = observer(
  ({ children }) => {
    return (
      <DynamicDashboardTemplate
        Header={<TypesViewHeader />}
        PrimarySidebar={{
          default: PageType.Type,
          items: [
            {
              key: PageType.Type,
              render: TypesPrimarySidebar,
            },
          ],
        }}
      >
        {children}
      </DynamicDashboardTemplate>
    )
  },
)
