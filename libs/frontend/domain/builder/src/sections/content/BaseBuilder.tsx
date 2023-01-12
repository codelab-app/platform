import type {
  IBuilderService,
  IElementService,
  IElementTree,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { defaultBuilderWidthBreakPoints } from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useMemo } from 'react'
import { Builder } from './Builder'

export interface BaseBuilderProps {
  elementTree: IElementTree
  renderer: IRenderer
  builderService: IBuilderService
  elementService: IElementService
  builderTabsWidth?: number
}

export const BaseBuilder = observer<BaseBuilderProps>(
  ({
    elementTree,
    renderer,
    builderService,
    elementService,
    builderTabsWidth,
  }) => {
    const rendererProps = useMemo(
      () => ({
        renderRoot: renderer.renderRoot.bind(renderer),
      }),
      [renderer],
    )

    const setCurrentBuilderWidth = useMemo(
      () => builderService.setCurrentBuilderWidth.bind(builderService),
      [builderService],
    )

    useEffect(() => {
      builderService.setBuilderContainerWidth(builderTabsWidth ?? 0)
      builderService.setSelectedBuilderWidth(
        defaultBuilderWidthBreakPoints.desktop,
      )
    }, [builderTabsWidth, builderService])

    return (
      <Builder
        currentBuilderWidth={builderService.currentBuilderWidth}
        currentDragData={builderService.currentDragData}
        deleteModal={elementService.deleteModal}
        elementTree={elementTree}
        key={renderer.pageTree?.current.root?.id}
        rendererProps={rendererProps}
        selectedBuilderWidth={builderService.selectedBuilderWidth}
        selectedNode={builderService.selectedNode}
        setCurrentBuilderWidth={setCurrentBuilderWidth}
        set_hoveredNode={builderService.set_hoveredNode.bind(builderService)}
        set_selectedNode={builderService.set_selectedNode.bind(builderService)}
      />
    )
  },
)
