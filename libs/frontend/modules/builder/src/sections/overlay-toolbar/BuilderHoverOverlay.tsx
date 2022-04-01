import { HoverOverlay } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { queryRenderedElementById } from '../../renderer/utils/queryRenderedElementById'
import { WithBuilderService } from '../../store/BuilderService'

export type BuilderHoverOverlayProps = WithBuilderService

export const BuilderHoverOverlay = observer<BuilderHoverOverlayProps>(
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
