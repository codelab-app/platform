'use client'

import type { IAppModel, IPageModel } from '@codelab/frontend/abstract/domain'

import { IRouteType } from '@codelab/frontend/abstract/application'

import { BaseBuilderPrimarySidebar } from '../base-builder/BaseBuilderPrimarySidebar'

interface PagePrimarySidebarProps {
  app: IAppModel
  page: IPageModel
}

export const PageBuilderPrimarySidebar = ({
  app,
  page,
}: PagePrimarySidebarProps) => {
  return (
    <BaseBuilderPrimarySidebar
      containerNode={page}
      context={{
        params: {
          appId: app.id,
          pageId: page.id,
        },
        type: IRouteType.Page,
      }}
    />
  )
}

PageBuilderPrimarySidebar.displayName = 'PrimarySidebar'
