'use client'

import type { IAppModel, IPageModel } from '@codelab/frontend/abstract/domain'

import {
  type IPageBuilderRouteContext,
  IRouteType,
  type PageContextParams,
} from '@codelab/frontend/abstract/application'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { useElementService } from '@codelab/frontend-application-element/services'
import { PageListPrimarySidebar } from '@codelab/frontend-application-page/views'
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
  page: IPageModel
  paneType?: ExplorerPaneType
}

export const PageBuilderPrimarySidebar = ({
  app,
  page,
  paneType,
}: PagePrimarySidebarProps) => {
  if (paneType === ExplorerPaneType.PageList) {
    return <PageListPrimarySidebar app={app} pageId={page.id} />
  }

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
