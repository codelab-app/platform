import type { ReactNode } from 'react'

import { ComponentConnector } from './Component.connector'
import { ComponentDetailHeader } from './ComponentDetailHeader'

export const ComponentDetailHeaderContainer = ({
  BuilderResizeMenu,
  componentId,
}: {
  BuilderResizeMenu: ReactNode
  componentId: string
}) => {
  return (
    <ComponentConnector id={componentId}>
      {(component) => (
        <ComponentDetailHeader
          BuilderResizeMenu={BuilderResizeMenu}
          component={component}
        />
      )}
    </ComponentConnector>
  )
}
