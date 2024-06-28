'use client'

import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { BuilderDndContext } from '@codelab/frontend-application-builder/dnd'
import {
  BuilderPrimarySidebar,
  BuilderTabs,
  ComponentsPrimarySidebar,
  ConfigPaneInspectorTabContainer,
} from '@codelab/frontend-application-builder/sections'
import {
  PageDetailHeader,
  PagesPrimarySidebar,
} from '@codelab/frontend-application-page/views'
import { SkeletonWrapper } from '@codelab/frontend-presentation-view/components/skeleton'
import { DynamicDashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import { Alert, Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { error } from 'neo4j-driver'
import React, { useMemo } from 'react'

const PageBuilderLayout = ({ children }: { children: React.ReactNode }) => {
  const contentStyles = useMemo(() => ({ paddingTop: '0rem' }), [])
  const isLoading = false

  return (
    <BuilderDndContext>
      <DynamicDashboardTemplate
        ConfigPane={() => (
          <SkeletonWrapper isLoading={isLoading}>
            <ConfigPaneInspectorTabContainer />
          </SkeletonWrapper>
        )}
        Header={PageDetailHeader}
        PrimarySidebar={{
          default: ExplorerPaneType.Explorer,
          items: [
            {
              key: ExplorerPaneType.Components,
              render: () => <ComponentsPrimarySidebar isLoading={isLoading} />,
            },
            {
              key: ExplorerPaneType.Explorer,
              render: () => <BuilderPrimarySidebar isLoading={isLoading} />,
            },
            {
              key: ExplorerPaneType.PageList,
              render: () => <PagesPrimarySidebar />,
            },
          ],
        }}
        contentStyles={contentStyles}
      >
        <Layout style={{ height: '100%' }}>
          <Content>{children}</Content>
        </Layout>
      </DynamicDashboardTemplate>
    </BuilderDndContext>
  )
}

export default PageBuilderLayout
