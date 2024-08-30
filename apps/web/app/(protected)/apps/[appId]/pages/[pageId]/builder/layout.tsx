import { isRuntimePage } from '@codelab/frontend/abstract/application'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import {
  BuilderPrimarySidebar,
  BuilderPrimarySidebarContainer,
  ComponentsPrimarySidebar,
  ConfigPaneInspectorTabContainer,
} from '@codelab/frontend-application-builder/sections'
import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import {
  PageDetailHeader,
  PagesPrimarySidebar,
} from '@codelab/frontend-application-page/views'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import { observer } from 'mobx-react-lite'
import type { ReactNode } from 'react'
import React, { useMemo } from 'react'

const Layout = ({
  children,
  configPane,
  demo,
  params: { appId, pageId },
}: {
  children: ReactNode
  params: { appId: string; pageId: string }
  configPane: ReactNode
  demo: string
}) => {
  return (
    <DashboardTemplate
      ConfigPane={configPane}
      // ConfigPane={<ConfigPaneInspectorTabContainer />}
      // Header={
      //   <PageDetailHeader
      //     BuilderResizeMenu={<BuilderResizeMenu />}
      //     appId={appId}
      //     pageId={pageId}
      //   />
      // }
      PrimarySidebar={{
        default: ExplorerPaneType.Explorer,
        items: [
          {
            key: ExplorerPaneType.Components,
            render: <ComponentsPrimarySidebar />,
          },
          {
            key: ExplorerPaneType.Explorer,
            render: <BuilderPrimarySidebarContainer pageId={pageId} />,
          },
          {
            key: ExplorerPaneType.PageList,
            render: <PagesPrimarySidebar />,
          },
        ],
      }}
      contentStyles={{ paddingTop: '0rem' }}
    >
      {children}
    </DashboardTemplate>
  )
}

export default Layout
