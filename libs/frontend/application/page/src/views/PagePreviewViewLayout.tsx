import type { IPageProps } from '@codelab/frontend/abstract/application'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { DynamicDashboardTemplate } from '@codelab/frontend/presentation/view'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import { PageDetailHeader } from './PageDetailHeader'

export type PagePreviewView = CodelabPage<IPageProps>

export const PagePreviewViewLayout: PagePreviewView['Layout'] = observer(
  ({ children }) => {
    return (
      <DynamicDashboardTemplate
        Header={observer(() => (
          <PageDetailHeader />
        ))}
        headerHeight={48}
      >
        {children()}
      </DynamicDashboardTemplate>
    )
  },
)
