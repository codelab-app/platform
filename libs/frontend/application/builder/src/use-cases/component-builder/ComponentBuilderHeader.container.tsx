import type { ReactNode } from 'react'

import { ComponentConnector } from '@codelab/frontend-application-component/views'

import { ComponentBuilderHeader } from './ComponentBuilderHeader'

export const ComponentBuilderHeaderContainer = ({
  BuilderResizeMenu,
  componentId,
}: {
  BuilderResizeMenu: ReactNode
  componentId: string
}) => {
  return (
    <ComponentConnector id={componentId}>
      {(component) => (
        <ComponentBuilderHeader
          BuilderResizeMenu={BuilderResizeMenu}
          component={component}
        />
      )}
    </ComponentConnector>
  )
}
