import { ErrorBoundary } from '@codelab/frontend/view/components'
import { IBuilderService } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const GetComponentsList = observer<Pick<IBuilderService, 'components'>>(
  ({ components = [] }) => {
    return (
      <ErrorBoundary>
        {components.map((component) => (
          <div>{component.name}</div>
        ))}
      </ErrorBoundary>
    )
  },
)
