import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { PageDetailHeader } from '@codelab/frontend-application-page/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'
import React from 'react'

const ComponentPreviewLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardTemplate
      Header={<PageDetailHeader BuilderResizeMenu={<BuilderResizeMenu />} />}
    >
      {children}
    </DashboardTemplate>
  )
}

export default ComponentPreviewLayout
