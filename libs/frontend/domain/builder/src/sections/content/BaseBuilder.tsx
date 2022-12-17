import type {
  IBuilderService,
  IElementService,
  IElementTree,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
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
    return (
      <Builder
        builderTabsWidth={builderTabsWidth}
        currentDragData={builderService.currentDragData}
        deleteModal={elementService.deleteModal}
        elementTree={elementTree}
        key={renderer.pageTree?.current.root?.id}
        mainContentWidth={builderService.mainContentWidth}
        rendererProps={{
          renderRoot: renderer.renderRoot.bind(renderer),
        }}
        selectedNode={builderService.selectedNode}
        setMainContentWidth={builderService.setMainContentWidth.bind(
          builderService,
        )}
        setMainResizingContentWidth={builderService.setMainResizingContentWidth.bind(
          builderService,
        )}
        setResizingMainContent={builderService.setResizingMainContent.bind(
          builderService,
        )}
        set_hoveredNode={builderService.set_hoveredNode.bind(builderService)}
        set_selectedNode={builderService.set_selectedNode.bind(builderService)}
      />
    )
  },
)
