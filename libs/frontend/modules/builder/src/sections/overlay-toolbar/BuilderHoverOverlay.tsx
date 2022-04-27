import { BUILDER_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { HoverOverlay } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { queryRenderedElementById } from '../../renderer/utils/queryRenderedElementById'

export const BuilderHoverOverlay = observer<WithServices<BUILDER_SERVICE>>(
  ({ builderService }) => {
    const hoveredElement = builderService.hoveredElement?.current

    if (!hoveredElement) {
      return null
    }

    const content = `${hoveredElement.label} ${
      hoveredElement.atom?.current
        ? `(${hoveredElement.atom?.current?.name})`
        : ''
    }`

    return (
      <HoverOverlay
        content={content}
        getOverlayElement={queryRenderedElementById}
        nodeId={hoveredElement.id}
      />
    )
  },
)

BuilderHoverOverlay.displayName = 'ElementBuilderHoverOverlay'
