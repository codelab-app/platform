import { IElement } from '@codelab/frontend/abstract/core'
import { useElementGraphContext } from '@codelab/frontend/modules/element'
import { Nullable } from '@codelab/shared/abstract/types'
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
import { ElementContextMenu } from '../ElementContextMenu'

export const MainPaneBuilderTreeTab = ({
  isComponentBuilder,
}: {
  isComponentBuilder?: boolean
}) => {
  const { elementTree } = useElementGraphContext()
  const { setExpandedNodeIds, expandedNodeIds } = useExpandedNodes(elementTree)

  const antdTree = elementTree.getAntdTree(
    isComponentBuilder ? ElementTree.isComponent : ElementTree.isElement,
  )

  const { isMoving, handleDrop } = useElementTreeDrop(elementTree)
  const { selectedElement, setSelectedElement } = useBuilderSelectedElement()
  const { setHoveringElement } = useBuilderHoveringElement()

  if (!elementTree) {
    return null
  }

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
      onMouseEnter={({ node }: any) => {
        setHoveringElement(node.id)
      }}
      onMouseLeave={() => setHoveringElement(undefined)}
      onSelect={([id], { nativeEvent, node }) => {
        nativeEvent.stopPropagation()

        if (id) {
          setSelectedElement(id.toString())
        }
      }}
      selectedKeys={selectedElement ? [selectedElement.id] : []}
      titleRender={(node) => <TreeItemTitle node={node} tree={elementTree} />}
      treeData={antdTree ? [antdTree] : undefined}
    />
  )
}

MainPaneBuilderTreeTab.displayName = 'MainPaneBuilderTreeTab'

const TreeItemTitle = ({
  node,
  tree,
}: {
  node: DataNode
  tree: ElementTree
}) => {
  const [contextMenuItemId, setContextMenuNodeId] =
    useState<Nullable<string>>(null)

  const element = node as any as IElement
  const { name, id: nodeId, atom } = element
  const atomName = atom?.name || atom?.type
  const isComponentInstance = !!element.instanceOfComponent

  const contextMenu = (
    <ElementContextMenu
      element={node as any}
      onClick={() => setContextMenuNodeId(null)}
    />
  )

  const componentInstanceName = element.instanceOfComponent
    ? tree.getComponentById(element.instanceOfComponent.id)?.name
    : undefined

  return (
    <div>
      <Dropdown
        onVisibleChange={() => setContextMenuNodeId(nodeId)}
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
        visible={contextMenuItemId === nodeId}
      >
        <div css={isComponentInstance ? tw`text-blue-400` : `text-gray-400`}>
          {name}{' '}
          <span css={tw` text-xs`}>
            {isComponentInstance
              ? `(instance of ${componentInstanceName ?? 'a Component'})`
              : atomName
              ? `(${atomName})`
              : ''}
          </span>
        </div>
      </Dropdown>
    </div>
  )
}
