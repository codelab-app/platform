import {
  elementRef,
  WithElementService,
} from '@codelab/frontend/modules/element'
import { Tree as AntdTree } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useElementTreeDrop, useExpandedNodes } from '../../../hooks'
import { WithBuilderService } from '../../../store/BuilderService'
import { TreeItemTitle } from './TreeItemTitle'

type MainPaneTreeProps = WithBuilderService & WithElementService

export const MainPaneTree = observer<MainPaneTreeProps>(
  ({ builderService, elementService }) => {
    const { setExpandedNodeIds, expandedNodeIds } =
      useExpandedNodes(builderService)

    const { isMoving, handleDrop } = useElementTreeDrop(elementService)
    const antdTree = elementService.elementTree.root?.antdNode

    return (
      <AntdTree
        blockNode
        className="draggable-tree"
        disabled={isMoving}
        draggable
        expandedKeys={expandedNodeIds}
        onClick={(e) => e.stopPropagation()}
        onDrop={handleDrop}
        onExpand={(expandedKeys) => setExpandedNodeIds(expandedKeys)}
        onMouseEnter={({ node }) => {
          builderService.setHoveredElement(elementRef(node.key.toString()))
        }}
        onMouseLeave={() => builderService.setHoveredElement(null)}
        onSelect={([id], { nativeEvent, node }) => {
          nativeEvent.stopPropagation()

          if (id) {
            builderService.setSelectedElement(elementRef(node.key.toString()))
          }
        }}
        selectedKeys={
          builderService.selectedElement
            ? [builderService.selectedElement.id]
            : []
        }
        titleRender={(node) => (
          <TreeItemTitle elementService={elementService} node={node} />
        )}
        treeData={antdTree ? [antdTree] : []}
      />
    )
  },
)

MainPaneTree.displayName = 'MainPaneBuilderTreeTab'
