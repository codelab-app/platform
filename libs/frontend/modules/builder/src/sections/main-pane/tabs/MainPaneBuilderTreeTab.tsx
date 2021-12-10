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
import { ElementContextMenu } from '../ElementContextMenu'

export const MainPaneBuilderTreeTab = () => {
  const { elementTree } = useElementGraphContext()
  const { setExpandedNodeIds, expandedNodeIds } = useExpandedNodes(elementTree)
  const antdTree = elementTree.getAntdTree(ElementTree.isElement)
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
        setHoveringElement(node.id)
      }}
      onMouseLeave={() => setHoveringElement(undefined)}
      onClick={(e) => e.stopPropagation()}
      onSelect={([id], { nativeEvent, node }) => {
        nativeEvent.stopPropagation()

        setSelectedElement(id?.toString())
      }}
      titleRender={(node) => <TreeItemTitle tree={elementTree} node={node} />}
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
  const [contextMenuItemId, setContextMenuNodeId] = useState<string | null>(
    null,
  )

  const element = node as any as IElement
  const { name, id: nodeId, atom } = element
  const atomName = atom?.name || atom?.type
  const isComponentInstance = !!element.instanceOfComponent

  const contextMenu = (
    <ElementContextMenu
      tree={tree}
      onClick={() => setContextMenuNodeId(null)}
      element={node as any}
    />
  )

  const componentInstanceName = element.instanceOfComponent
    ? tree.getComponentById(element.instanceOfComponent.id)?.name
    : undefined

  return (
    <div>
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
