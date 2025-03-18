'use client'

import type { IPageBuilderRouteContext } from '@codelab/frontend/abstract/application'
import type { IAppModel, IPageModel } from '@codelab/frontend/abstract/domain'

import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { useElementService } from '@codelab/frontend-application-element/services'
import { PagesPrimarySidebar } from '@codelab/frontend-application-page/views'
import { useActionService } from '@codelab/frontend-application-store/services'
import { useFieldService } from '@codelab/frontend-application-type/services'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { ErrorBoundary } from 'react-error-boundary'
import { merge, mergeDeep } from 'remeda'

import { BaseBuilderPrimarySidebar } from '../base-builder/BaseBuilderPrimarySidebar'

interface PagePrimarySidebarProps {
  app: IAppModel
  context: IPageBuilderRouteContext
  page: IPageModel
  paneType?: ExplorerPaneType
}

export const PagePrimarySidebar = ({
  app,
  context,
  page,
  paneType,
}: PagePrimarySidebarProps) => {
  const router = useRouter()
  const { createPopover: createElementPopover } = useElementService()
  const { createPopover: createFieldPopover } = useFieldService()
  const { createPopover: createActionPopover } = useActionService()

  const openCreateElementPopover = () => {
    createElementPopover.open(router, context)
  }

  const openCreateFieldPopover = () => {
    const store = page.store.current

    createFieldPopover.open(
      router,
      mergeDeep(context, {
        params: {
          interfaceId: store.api.id,
        },
      }),
    )
  }

  const openCreateActionPopover = () => {
    createActionPopover.open(router, context)
  }

  if (paneType === ExplorerPaneType.PageList) {
    return <PagesPrimarySidebar app={app} pageId={page.id} />
  }

  return (
    <BaseBuilderPrimarySidebar
      containerNode={page}
      context={context}
      openCreateActionPopover={openCreateActionPopover}
      openCreateElementPopover={openCreateElementPopover}
      openCreateFieldPopover={openCreateFieldPopover}
    />
  )
}

PagePrimarySidebar.displayName = 'PrimarySidebar'
