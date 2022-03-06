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

type MainPaneBuilderTreeTabProps = { isComponentBuilder?: boolean }

export const MainPaneBuilderTreeTab = (props: MainPaneBuilderTreeTabProps) => {
  const { elementTree } = useElementGraphContext()
  const { setExpandedNodeIds, expandedNodeIds } = useExpandedNodes(elementTree)
  const [antdTree] = elementTree.getAntdTree()
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
      treeData={antdTree ? [antdTree] : []}
    />
  )
}

MainPaneBuilderTreeTab.displayName = 'MainPaneBuilderTreeTab'

type TreeItemTitleProps = {
  node: DataNode
  tree: ElementTree
}

type TreeItemDropDownOverplayProps = {
  setContextMenuNodeId: (id: Nullable<string>) => void
  node: IElement
}

const TreeItemDropDownOverplay = ({
  setContextMenuNodeId,
  node,
}: TreeItemDropDownOverplayProps) => {
  const closeMenu = () => setContextMenuNodeId(null)

  const onClick = (e: React.MouseEvent) => {
    closeMenu()
    e.stopPropagation()
  }

  return (
    <>
      <div css={tw`inset-0`} onClick={onClick} />
      <ElementContextMenu element={node as any} onClick={closeMenu} />
    </>
  )
}

const TreeItemTitle = ({ node, tree }: TreeItemTitleProps) => {
  const [contextMenuItemId, setContextMenuNodeId] =
    useState<Nullable<string>>(null)

  const element = node as unknown as IElement
  const { name, id: nodeId, atom } = element
  const atomName = atom?.name || atom?.type

  const componentInstanceName = element.instanceOfComponent
    ? tree.getComponentById(element.instanceOfComponent.id)?.name
    : undefined

  const isComponentInstance = !!element.instanceOfComponent

  const componentMeta = componentInstanceName
    ? `(instance of ${componentInstanceName || 'a Component'})`
    : undefined

  const atomMeta = atomName ? `(${atomName})` : undefined
  const meta = componentMeta || atomMeta || ''

  return (
    <div>
      <Dropdown
        onVisibleChange={() => setContextMenuNodeId(nodeId)}
        overlay={
          <TreeItemDropDownOverplay
            node={element}
            setContextMenuNodeId={setContextMenuNodeId}
          />
        }
        trigger={['contextMenu']}
        visible={contextMenuItemId === nodeId}
      >
        <div css={isComponentInstance ? tw`text-blue-400` : `text-gray-400`}>
          {name} <span css={tw`text-xs`}>{meta}</span>
        </div>
      </Dropdown>
    </div>
  )
}
