'use client'

import {
  type ComponentContextParams,
  ExplorerPaneType,
} from '@codelab/frontend/abstract/types'
import {
  BuilderPrimarySidebar,
  ComponentsPrimarySidebar,
} from '@codelab/frontend-application-builder/sections'
import { PagesPrimarySidebar } from '@codelab/frontend-application-page/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'next/navigation'

const PrimarySidebar = observer(
  ({ params: { componentId } }: { params: ComponentContextParams }) => {
    const { componentDomainService } = useDomainStore()
    const component = componentDomainService.components.get(componentId)
    const searchParams = useSearchParams()
    const primarySidebarKey = searchParams.get('primarySidebarKey')

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

export default PrimarySidebar
