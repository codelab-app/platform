import type { IElementTree, IRenderer } from '@codelab/frontend/abstract/core'
import { defaultBuilderWidthBreakPoints } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useMemo } from 'react'
import { Builder } from './Builder'

export interface BaseBuilderProps {
  elementTree: IElementTree
  renderer: IRenderer
  builderTabsWidth?: number
}

export const BaseBuilder = observer<BaseBuilderProps>(
  ({ elementTree, renderer, builderTabsWidth }) => {
    const { builderService, elementService } = useStore()

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
        key={renderer.elementTree.current.root?.id}
        rendererProps={rendererProps}
        selectedBuilderWidth={builderService.selectedBuilderWidth}
        selectedNode={builderService.selectedNode}
        setCurrentBuilderWidth={setCurrentBuilderWidth}
        setHoveredNode={builderService.setHoveredNode.bind(builderService)}
        setSelectedNode={builderService.setSelectedNode.bind(builderService)}
      />
    )
  },
)
