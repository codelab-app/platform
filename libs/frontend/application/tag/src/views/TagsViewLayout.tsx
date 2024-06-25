import type { CodelabPage } from '@codelab/frontend/abstract/types'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import type { DashboardTemplateProps } from '@codelab/frontend-presentation-view/templates'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import React, { useMemo } from 'react'
import { TagsPrimarySidebar } from '../use-cases/primary-sidebar'
import { TagsViewHeader } from './TagsViewHeader'

export type ITagsView = CodelabPage<DashboardTemplateProps>

export const TagsViewLayout: ITagsView['Layout'] = ({ children }) => {
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
