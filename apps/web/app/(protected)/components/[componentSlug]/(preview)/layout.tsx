import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { ComponentDetailHeader } from '@codelab/frontend-application-component/views'
import { DashboardTemplate } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'
import React from 'react'

const ComponentPreviewLayout = ({
  children,
  params: { componentId },
}: {
  children: ReactNode
  params: { componentId: string }
}) => {
  return (
    <DashboardTemplate
      Header={
        <ComponentDetailHeader
          BuilderResizeMenu={<BuilderResizeMenu />}
          componentId={componentId}
        />
      }
    >
      {children}
    </DashboardTemplate>
  )
}

export default ComponentPreviewLayout
