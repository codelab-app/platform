import { IElement } from '@codelab/frontend/abstract/core'
import { useElementGraphContext } from '@codelab/frontend/modules/element'
import { ElementTree } from '@codelab/shared/core'
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
import { ComponentContextMenu } from '../ComponentContextMenu'
import { ElementContextMenu } from '../ElementContextMenu'

export interface MainPaneBuilderTreeTabProps {
  restrictComponentEditing?: boolean
}

export const MainPaneBuilderTreeTab = ({
  restrictComponentEditing,
}: MainPaneBuilderTreeTabProps) => {
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
      onMouseEnter={({ node }: any) => {
        if (!restrictComponentEditing || ElementTree.isElement(node)) {
          setHoveringElement(node.id)
        }
      }}
      onMouseLeave={() => setHoveringElement(undefined)}
      onClick={(e) => e.stopPropagation()}
      onSelect={([id], { nativeEvent, node }) => {
        nativeEvent.stopPropagation()

        if (!restrictComponentEditing || ElementTree.isElement(node as any)) {
          setSelectedElement(id?.toString())
        }
      }}
      titleRender={(node) => (
        <TreeItemTitle
          tree={elementTree}
          restrictComponentEditing={restrictComponentEditing}
          node={node}
        />
      )}
      treeData={antdTree ? [antdTree] : undefined}
    />
  )
}

MainPaneBuilderTreeTab.displayName = 'MainPaneBuilderTreeTab'

const TreeItemTitle = ({
  node,
  tree,
  restrictComponentEditing,
}: { node: DataNode; tree: ElementTree } & MainPaneBuilderTreeTabProps) => {
  const [contextMenuItemId, setContextMenuNodeId] = useState<string | null>(
    null,
  )

  const element = node as any as IElement
  const { name, id: nodeId, atom } = element
  const atomName = atom?.name || atom?.type
  const isComponent = ElementTree.isComponent(element)

  const contextMenu =
    restrictComponentEditing && isComponent ? (
      <ComponentContextMenu
        // We need to manually hide the context menu, otherwise it stays open
        onClick={() => setContextMenuNodeId(null)}
        element={node as any}
      />
    ) : (
      <ElementContextMenu
        tree={tree}
        onClick={() => setContextMenuNodeId(null)}
        element={node as any}
      />
    )

  const label = isComponent ? element.componentTag?.name ?? name : name

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
            {contextMenu}
          </>
        }
        trigger={['contextMenu']}
      >
        <div
          css={
            restrictComponentEditing && isComponent
              ? tw`text-blue-400`
              : `text-gray-400`
          }
        >
          {label}{' '}
          <span css={tw` text-xs`}>
            {isComponent ? '(Component)' : atomName ? `(${atomName})` : ''}
          </span>
        </div>
      </Dropdown>
    </div>
  )
}
