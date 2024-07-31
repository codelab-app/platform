import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { ComponentsPrimarySidebar } from '@codelab/frontend-application-builder/sections'
import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { PageDetailHeader } from '@codelab/frontend-application-page/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Component Builder | Codelab',
}

const ComponentBuilderView = async () => {
  return (
    <DashboardTemplate
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
    />
  )
}

export default ComponentBuilderView
