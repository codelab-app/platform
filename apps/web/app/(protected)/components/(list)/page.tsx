import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { atomListUseCase } from '@codelab/frontend-application-atom/use-cases/get-atoms/server'
import { ComponentsPrimarySidebar } from '@codelab/frontend-application-builder/sections'
import { componentListUseCase } from '@codelab/frontend-application-component/use-cases/component-list'
import { ComponentDetailHeader } from '@codelab/frontend-application-component/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Components | Codelab',
}

const ComponentsRoute = async () => {
  const { components } = await componentListUseCase()
  const { items: atoms } = await atomListUseCase()

  return (
    <DashboardTemplate
      Header={<ComponentDetailHeader />}
      PrimarySidebar={{
        default: ExplorerPaneType.Components,
        items: [
          {
            key: ExplorerPaneType.Components,
            render: (
              <ComponentsPrimarySidebar atoms={atoms} components={components} />
            ),
          },
        ],
      }}
    />
  )
}

export default ComponentsRoute
