import { ErrorBoundary } from '@codelab/frontend/view/components'
import { IBuilderComponent } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { DraggableGetComponentItem } from './GetComponentItem'

export const GetComponentsList = observer<{
  components: Array<IBuilderComponent>
}>(({ components = [] }) => {
  return (
    <ErrorBoundary>
      {components.map((component) => (
        <DraggableGetComponentItem component={component} key={component.id} />
      ))}
    </ErrorBoundary>
  )
})
