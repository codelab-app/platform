import { BuilderResizeMenu } from '@codelab/frontend-application-builder/use-cases/resize'
import { ComponentDetailHeader } from '@codelab/frontend-application-component/views'
import { Dashboard } from '@codelab/frontend-presentation-view/templates'
import type { ReactNode } from 'react'

const ComponentPreviewLayout = ({
  children,
  params: { componentId },
}: {
  children: ReactNode
  params: { componentId: string }
}) => {
  return (
    <Dashboard
      Header={
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
