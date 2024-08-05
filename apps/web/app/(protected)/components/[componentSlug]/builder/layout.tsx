import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { ComponentsPrimarySidebar } from '@codelab/frontend-application-builder/sections'
import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { PageDetailHeader } from '@codelab/frontend-application-page/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'
import React from 'react'

const BuilderLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardTemplate
      // ConfigPane={() => <ConfigPaneInspectorTabContainer />}
      Header={<PageDetailHeader BuilderResizeMenu={<BuilderResizeMenu />} />}
      PrimarySidebar={{
        default: ExplorerPaneType.Explorer,
        items: [
          {
            key: ExplorerPaneType.Components,
            render: <ComponentsPrimarySidebar atoms={[]} components={[]} />,
          },
          // {
          //   key: ExplorerPaneType.Explorer,
          //   render: <BuilderPrimarySidebar />,
          // },
        ],
      }}
    >
      {children}
    </DashboardTemplate>
  )
}

export default BuilderLayout
