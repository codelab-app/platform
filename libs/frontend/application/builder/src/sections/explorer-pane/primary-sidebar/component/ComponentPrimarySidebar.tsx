'use client'

import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import {
  type ComponentContextParams,
  IRouteType,
} from '@codelab/frontend/abstract/application'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

import { BaseBuilderPrimarySidebar } from '../base-builder/BaseBuilderPrimarySidebar'
import { ComponentsPrimarySidebar } from './ComponentsPrimarySidebar'

export const ComponentPrimarySidebar = observer<{
  params: ComponentContextParams
  searchParams: SearchParamsPageProps
  component: IComponentModel
}>(({ component, params, searchParams }) => {
  const { primarySidebarKey } = searchParams

  if (primarySidebarKey === ExplorerPaneType.Components) {
    return <ComponentsPrimarySidebar />
  }

  return (
    <BaseBuilderPrimarySidebar
      containerNode={component}
      context={{
        params,
        type: IRouteType.Component,
      }}
    />
  )
})

ComponentPrimarySidebar.displayName = 'ComponentPrimarySidebar'
