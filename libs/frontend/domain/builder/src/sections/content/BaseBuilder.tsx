import type {
  IBuilderService,
  IElementService,
  IElementTree,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
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

    const setMainContentWidth = useMemo(
      () => builderService.setMainContentWidth.bind(builderService),
      [builderService],
    )

    const setMainResizingContentWidth = useMemo(
      () => builderService.setMainResizingContentWidth.bind(builderService),
      [builderService],
    )

    const setResizingMainContent = useMemo(
      () => builderService.setResizingMainContent.bind(builderService),
      [builderService],
    )

    return (
      <Builder
        builderTabsWidth={builderTabsWidth}
        currentDragData={builderService.currentDragData}
        deleteModal={elementService.deleteModal}
        elementTree={elementTree}
        key={renderer.pageTree?.current.root?.id}
        mainContentWidth={builderService.mainContentWidth}
        rendererProps={rendererProps}
        selectedNode={builderService.selectedNode}
        setMainContentWidth={setMainContentWidth}
        setMainResizingContentWidth={setMainResizingContentWidth}
        setResizingMainContent={setResizingMainContent}
        set_hoveredNode={builderService.set_hoveredNode.bind(builderService)}
        set_selectedNode={builderService.set_selectedNode.bind(builderService)}
      />
    )
  },
)
