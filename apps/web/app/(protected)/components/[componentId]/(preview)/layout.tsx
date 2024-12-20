import type { ReactNode } from 'react'

import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { ComponentDetailHeader } from '@codelab/frontend-application-component/views'
import { Dashboard } from '@codelab/frontend-presentation-view/templates'

const ComponentPreviewLayout = ({
  children,
  params: { componentId },
}: {
  children: ReactNode
  params: { componentId: string }
}) => {
  return (
    <Dashboard
      header={
        <ComponentDetailHeader
          BuilderResizeMenu={<BuilderResizeMenu />}
          componentId={componentId}
        />
      }
    >
      {children}
    </Dashboard>
  )
}

export default ComponentPreviewLayout
