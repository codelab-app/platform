import {
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
}

export const BaseBuilder = observer<BaseBuilderProps>(
  ({ elementTree, renderer, builderService, elementService }) => {
    return (
      <Builder
        currentDragData={builderService.currentDragData}
        // deleteModal={elementService.deleteModal}
        // handleElementDrop={elementService.handleElementDrop}
        elementService={elementService}
        elementTree={elementTree}
        key={renderer.pageTree?.current.root?.id}
        rendererProps={{
          renderRoot: renderer.renderRoot.bind(renderer),
        }}
        selectedNode={builderService.selectedNode}
        set_hoveredNode={builderService.set_hoveredNode.bind(builderService)}
        set_selectedNode={builderService.set_selectedNode.bind(builderService)}
      />
    )
  },
)
