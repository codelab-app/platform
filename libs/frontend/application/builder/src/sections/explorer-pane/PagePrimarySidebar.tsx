'use client'

import type { IAppModel, IPageModel } from '@codelab/frontend/abstract/domain'

import {
  ExplorerPaneType,
  type PageContextParams,
} from '@codelab/frontend/abstract/types'
import { PagesPrimarySidebar } from '@codelab/frontend-application-page/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'
import { ErrorBoundary } from 'react-error-boundary'

import { BuilderPrimarySidebar } from './BuilderPrimarySidebar'

export const PagePrimarySidebar = ({
  app,
  page,
  type,
}: {
  app: IAppModel
  page: IPageModel
  type?: ExplorerPaneType
}) => {
  if (type === ExplorerPaneType.PageList) {
    return <PagesPrimarySidebar app={app} page={page} />
  }

  return (
    <ErrorBoundary fallbackRender={() => 'BuilderPrimarySidebar'}>
      <BuilderPrimarySidebar containerNode={page} />
    </ErrorBoundary>
  )
}

PagePrimarySidebar.displayName = 'PrimarySidebar'
