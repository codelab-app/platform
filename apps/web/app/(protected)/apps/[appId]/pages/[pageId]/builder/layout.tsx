'use client'

import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  BuilderPrimarySidebar,
  ComponentsPrimarySidebar,
  ConfigPaneInspectorTabContainer,
} from '@codelab/frontend-application-builder/sections'
import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import {
  PageDetailHeader,
  PagesPrimarySidebar,
} from '@codelab/frontend-application-page/views'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import { observer } from 'mobx-react-lite'
import type { ReactNode } from 'react'
import React, { useMemo } from 'react'

const Layout = observer(
  ({
    children,
    params: { appId, pageId },
  }: {
    children: ReactNode
    params: { appId: string; pageId: string }
  }) => {
    const { pageDomainService } = useDomainStore()
    const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])
    /**
     * Page may be not hydrated yet
     */
    const page = pageDomainService.pages.get(pageId)

    return (
      <DashboardTemplate
        ConfigPane={<ConfigPaneInspectorTabContainer />}
        Header={<PageDetailHeader BuilderResizeMenu={<BuilderResizeMenu />} />}
        PrimarySidebar={{
          default: ExplorerPaneType.Explorer,
          items: [
            {
              key: ExplorerPaneType.Components,
              render: <ComponentsPrimarySidebar />,
            },
            {
              key: ExplorerPaneType.Explorer,
              render: page ? (
                <BuilderPrimarySidebar containerNode={page} />
              ) : (
                <Spinner isLoading />
              ),
            },
            {
              key: ExplorerPaneType.PageList,
              render: <PagesPrimarySidebar />,
            },
          ],
        }}
        contentStyles={contentStyles}
      >
        {children}
      </DashboardTemplate>
    )
  },
)

export default Layout
