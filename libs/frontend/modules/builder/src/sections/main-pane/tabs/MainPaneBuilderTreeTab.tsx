import { IElement } from '@codelab/frontend/abstract/core'
import { useElementGraphContext } from '@codelab/frontend/modules/element'
import { Dropdown, Tree as AntdTree } from 'antd'
import { DataNode } from 'rc-tree/lib/interface'
import React, { useState } from 'react'
import tw from 'twin.macro'
import {
  useBuilderHoveringElement,
  useBuilderSelectedElement,
  useElementTreeDrop,
  useExpandedNodes,
} from '../../../hooks'
import { ElementContextMenu } from '../ElementContextMenu'

export const MainPaneBuilderTreeTab = () => {
  const { elementTree } = useElementGraphContext()
  const { setExpandedNodeIds, expandedNodeIds } = useExpandedNodes(elementTree)
  const antdTree = elementTree.getAntdTree()
  const { isMoving, handleDrop } = useElementTreeDrop(elementTree)
  const { selectedElement, setSelectedElement } = useBuilderSelectedElement()
  const { setHoveringElement } = useBuilderHoveringElement()

  if (!elementTree) {
    return null
  }

  return (
    <AntdTree
      disabled={isMoving}
      className="draggable-tree"
      blockNode
      expandedKeys={expandedNodeIds}
      draggable
      onExpand={(expandedKeys) => setExpandedNodeIds(expandedKeys)}
      onDrop={handleDrop}
      selectedKeys={selectedElement ? [selectedElement.id] : []}
      onMouseEnter={({ node: { id } }: any) => setHoveringElement(id)}
      onMouseLeave={() => setHoveringElement(undefined)}
      onClick={(e) => e.stopPropagation()}
      onSelect={([id], { nativeEvent }) => {
        nativeEvent.stopPropagation()
        setSelectedElement(id?.toString())
      }}
      titleRender={(node) => <TreeItemTitle node={node} />}
      treeData={antdTree ? [antdTree] : undefined}
    />
  )
}

MainPaneBuilderTreeTab.displayName = 'MainPaneBuilderTreeTab'

const TreeItemTitle = ({ node }: { node: DataNode }) => {
  const [contextMenuItemId, setContextMenuNodeId] = useState<string | null>(
    null,
  )

  const element = node as any as IElement
  const { name: label, id: nodeId, atom } = element
  const atomName = atom?.name || atom?.type

  return (
    <div data-cy={`atom-${label}`}>
      <Dropdown
        onVisibleChange={() => setContextMenuNodeId(nodeId)}
        visible={contextMenuItemId === nodeId}
        overlay={
          <>
            <div
              css={tw`fixed inset-0`}
              onClick={(e) => {
                setContextMenuNodeId(null)
                e.stopPropagation()
              }}
            />
            <ElementContextMenu
              // We need to manually hide the context menu, otherwise it stays open
              onClick={() => setContextMenuNodeId(null)}
              element={node as any}
            />
          </>
        }
        trigger={['contextMenu']}
      >
        <div>
          {label}{' '}
          {atomName && (
            <span css={tw`text-gray-400 text-xs`}>({atomName})</span>
          )}
        </div>
      </Dropdown>
    </div>
  )
}
