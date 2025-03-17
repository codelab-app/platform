'use client'

import type {
  BuilderContextParams,
  ComponentContextParams,
  SearchParamsPageProps,
} from '@codelab/frontend/abstract/types'

import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

import { BaseBuilderPrimarySidebar } from '../base-builder/BaseBuilderPrimarySidebar'
import { ComponentsPrimarySidebar } from './ComponentsPrimarySidebar'

export const ComponentPrimarySidebar = observer<{
  params: BuilderContextParams
  searchParams: SearchParamsPageProps
}>(({ params: { appId, componentId, pageId }, searchParams }) => {
  const { componentDomainService } = useDomainStore()
  const component = componentDomainService.components.get(componentId)
  const { primarySidebarKey } = searchParams

  if (!component) {
    return <Spinner isLoading />
  }

  if (primarySidebarKey === ExplorerPaneType.Components) {
    return <ComponentsPrimarySidebar />
  }

  return (
    <BaseBuilderPrimarySidebar
      appId={appId}
      componentId={componentId}
      containerNode={component}
      pageId={pageId}
    />
  )
})

ComponentPrimarySidebar.displayName = 'ComponentPrimarySidebar'
