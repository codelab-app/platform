import {
  BUILDER_SERVICE,
  ELEMENT_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/modules/element'
import { Tree as AntdTree } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useElementTreeDrop, useExpandedNodes } from '../../../hooks'
import { TreeItemTitle } from './TreeItemTitle'

export const MainPaneTree = observer<
  WithServices<BUILDER_SERVICE | ELEMENT_SERVICE>
>(({ builderService, elementService }) => {
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
          builderService.set_selectedElement(elementRef(node.key.toString()))
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
})

MainPaneTree.displayName = 'MainPaneBuilderTreeTab'
