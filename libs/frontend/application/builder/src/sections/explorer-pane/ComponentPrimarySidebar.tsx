'use client'

import type {
  ComponentContextParams,
  SearchParamsPageProps,
} from '@codelab/frontend/abstract/types'

import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

import { BuilderPrimarySidebar } from './BuilderPrimarySidebar'
import { ComponentsPrimarySidebar } from './ComponentsPrimarySidebar'

export const ComponentPrimarySidebar = observer(
  ({
    params: { componentId },
    searchParams,
  }: {
    params: ComponentContextParams
    searchParams: SearchParamsPageProps
  }) => {
    const { componentDomainService } = useDomainStore()
    const component = componentDomainService.components.get(componentId)
    const { primarySidebarKey } = searchParams

    if (!component) {
      return <Spinner isLoading />
    }

    if (primarySidebarKey === ExplorerPaneType.Components) {
      return <ComponentsPrimarySidebar />
    }

    return <BuilderPrimarySidebar containerNode={component} />
  },
)

ComponentPrimarySidebar.displayName = 'ComponentPrimarySidebar'
