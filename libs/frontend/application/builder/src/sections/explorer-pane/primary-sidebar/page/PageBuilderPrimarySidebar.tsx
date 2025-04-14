'use client'

import type { IPageBuilderRoute } from '@codelab/frontend/abstract/application'
import type { IAppModel, IPageModel } from '@codelab/frontend/abstract/domain'

import { IRouteType } from '@codelab/frontend/abstract/application'

import { BaseBuilderPrimarySidebar } from '../base-builder/BaseBuilderPrimarySidebar'

interface PagePrimarySidebarProps {
  app: IAppModel
  context: IPageBuilderRoute
  page: IPageModel
}

export const PageBuilderPrimarySidebar = ({
  app,
  context,
  page,
}: PagePrimarySidebarProps) => {
  return <BaseBuilderPrimarySidebar containerNode={page} context={context} />
}

PageBuilderPrimarySidebar.displayName = 'PrimarySidebar'
