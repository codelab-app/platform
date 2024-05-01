import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { DynamicDashboardTemplate } from '@codelab/frontend/presentation/view'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { PageDetailHeader } from './PageDetailHeader'

export const PagePreviewViewLayout: CodelabPage['Layout'] = observer(
  ({ children }) => {
    return (
      <DynamicDashboardTemplate
        Header={observer(() => (
          <PageDetailHeader />
        ))}
      >
        {children}
      </DynamicDashboardTemplate>
    )
  },
)
