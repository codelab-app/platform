import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import { DynamicDashboardTemplate } from '@codelab/frontend/presentation/view'
import React, { useMemo } from 'react'
import { TagsPrimarySidebar } from '../use-cases'
import { TagsViewHeader } from './TagsViewHeader'

export type TagsView = CodelabPage<DashboardTemplateProps>

export const TagsViewLayout: TagsView['Layout'] = ({ children }) => {
  const memoizedPrimarySidebar = useMemo(
    () => ({
      default: ExplorerPaneType.Tag,
      items: [{ key: ExplorerPaneType.Tag, render: TagsPrimarySidebar }],
    }),
    [],
  )

  return (
    <DynamicDashboardTemplate
      Header={TagsViewHeader}
      PrimarySidebar={memoizedPrimarySidebar}
    >
      {children}
    </DynamicDashboardTemplate>
  )
}

TagsViewLayout.displayName = 'TagsViewLayout'
