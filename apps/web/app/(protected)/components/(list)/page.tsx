import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { StoreHydrator } from '@codelab/frontend/infra/context'
import { atomListQuery } from '@codelab/frontend-application-atom/use-cases/get-atoms/server'
import { ComponentsPrimarySidebar } from '@codelab/frontend-application-builder/sections'
import { componentListQuery } from '@codelab/frontend-application-component/use-cases/component-list'
import { ComponentListHeader } from '@codelab/frontend-application-component/views'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Components | Codelab',
}

const ComponentsRoute = async () => {
  const [{ items: components }, { items: atoms }] = await Promise.all([
    componentListQuery(),
    atomListQuery(),
  ])

  return (
    <StoreHydrator
      atomsDto={atoms}
      componentsDto={components}
      fallback={<Spinner center isLoading />}
    >
      <DashboardTemplate
        Header={<ComponentListHeader />}
        PrimarySidebar={{
          default: ExplorerPaneType.Components,
          items: [
            {
              key: ExplorerPaneType.Components,
              render: <ComponentsPrimarySidebar />,
            },
          ],
        }}
      />
    </StoreHydrator>
  )
}

export default ComponentsRoute
