'use client'

import type {
  ComponentContextParams,
  SearchParamsPageProps,
} from '@codelab/frontend/abstract/types'

import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  BuilderPrimarySidebar,
  ComponentsPrimarySidebar,
} from '@codelab/frontend-application-builder/sections'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

const PrimarySidebar = observer(
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

    // if (primarySidebarKey === ExplorerPaneType.PageList) {
    //   return <PagesPrimarySidebar />
    // }

    if (primarySidebarKey === ExplorerPaneType.Components) {
      return <ComponentsPrimarySidebar />
    }

    return <BuilderPrimarySidebar containerNode={component} />
  },
)

PrimarySidebar.displayName = 'PrimarySidebar'

export default PrimarySidebar
