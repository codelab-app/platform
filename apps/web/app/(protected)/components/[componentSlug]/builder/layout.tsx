import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { ComponentsPrimarySidebar } from '@codelab/frontend-application-builder/sections'
import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { ComponentDetailHeader } from '@codelab/frontend-application-component/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'
import React from 'react'

const BuilderLayout = ({
  children,
  params: { componentId },
}: {
  children: ReactNode
  params: { componentId: string }
}) => {
  return (
    <DashboardTemplate
      // ConfigPane={() => <ConfigPaneInspectorTabContainer />}
      Header={
        <ComponentDetailHeader
          BuilderResizeMenu={<BuilderResizeMenu />}
          componentId={componentId}
        />
      }
      PrimarySidebar={{
        default: ExplorerPaneType.Explorer,
        items: [
          {
            key: ExplorerPaneType.Components,
            render: <ComponentsPrimarySidebar />,
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
