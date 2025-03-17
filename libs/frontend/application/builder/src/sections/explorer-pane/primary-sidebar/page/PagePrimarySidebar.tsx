'use client'

import type { IAppModel, IPageModel } from '@codelab/frontend/abstract/domain'

import {
  type BuilderContextParams,
  ExplorerPaneType,
} from '@codelab/frontend/abstract/types'
import { useElementService } from '@codelab/frontend-application-element/services'
import { PagesPrimarySidebar } from '@codelab/frontend-application-page/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'
import { ErrorBoundary } from 'react-error-boundary'

import { BaseBuilderPrimarySidebar } from '../base-builder/BaseBuilderPrimarySidebar'

type PagePrimarySidebarProps = {
  app: IAppModel
  page: IPageModel
  type?: ExplorerPaneType
} & BuilderContextParams

export const PagePrimarySidebar = ({
  app,
  page,
  type,
}: PagePrimarySidebarProps) => {
  // const router = useRouter()
  const { createPopoverInPageBuilder } = useElementService()

  // const { createPopover: createFieldPopover } = useFieldService()
  // const { createPopover: createActionPopover } = useActionService()
  if (type === ExplorerPaneType.PageList) {
    return <PagesPrimarySidebar app={app} pageId={page.id} />
  }

  return (
    <ErrorBoundary fallbackRender={() => 'BuilderPrimarySidebar'}>
      <BaseBuilderPrimarySidebar containerNode={page} />
    </ErrorBoundary>
  )
}

PagePrimarySidebar.displayName = 'PrimarySidebar'
