import { IElement } from '@codelab/frontend/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { ElementTree } from '@codelab/shared/core'
import { Dropdown } from 'antd'
import { DataNode } from 'rc-tree/lib/interface'
import React, { useState } from 'react'
import tw from 'twin.macro'
import {
  useBuilderHoveringElement,
  useBuilderSelectedElement,
} from '../../../hooks'
import { ElementContextMenu } from '../ElementContextMenu'

type MainPaneBuilderTreeTabProps = {
  isComponentBuilder?: boolean
  rootId: string
}

export const MainPaneBuilderTreeTab = ({
  rootId,
}: MainPaneBuilderTreeTabProps) => {
  // const { elementTree } = useElementGraphContext()
  // const { setExpandedNodeIds, expandedNodeIds } = useExpandedNodes(elementTree)
  // we have main tree and components trees.
  // so we need the root to find the correct one
  // const antdTree = elementTree.getAntdTrees().find((x: any) => x?.id === rootId)
  // const { isMoving, handleDrop } = useElementTreeDrop(elementTree)
  const { selectedElement, setSelectedElement } = useBuilderSelectedElement()
  const { setHoveringElement } = useBuilderHoveringElement()

  // if (!elementTree) {
  //   return null
  // }
  return null

  // return (
  //   <AntdTree
  //     blockNode
  //     className="draggable-tree"
  //     disabled={isMoving}
  //     draggable
  //     expandedKeys={expandedNodeIds}
  //     onClick={(e) => e.stopPropagation()}
  //     onDrop={handleDrop}
  //     onExpand={(expandedKeys) => setExpandedNodeIds(expandedKeys)}
  //     onMouseEnter={({ node }: any) => {
  //       setHoveringElement(node.id)
  //     }}
  //     onMouseLeave={() => setHoveringElement(undefined)}
  //     onSelect={([id], { nativeEvent, node }) => {
  //       nativeEvent.stopPropagation()
  //
  //       if (id) {
  //         setSelectedElement(id.toString())
  //       }
  //     }}
  //     selectedKeys={selectedElement ? [selectedElement.id] : []}
  //     titleRender={(node) => <TreeItemTitle node={node} tree={elementTree} />}
  //     treeData={antdTree ? [antdTree] : []}
  //   />
  // )
}

MainPaneBuilderTreeTab.displayName = 'MainPaneBuilderTreeTab'

interface TreeItemTitleProps extends WithElementService {
  node: DataNode
}

const TreeItemTitle = observer(
  ({ node, elementService }: TreeItemTitleProps) => {
    const [contextMenuItemId, setContextMenuNodeId] =
      useState<Nullable<string>>(null)

    const element = elementService.elementTree.element(node.key.toString())

    if (!element) {
      return null
    }

    const atomName = element.atom?.current?.name || element.atom?.current?.type
    const componentInstanceName = element.instanceOfComponent?.current?.name
    const isComponentInstance = !!element.instanceOfComponent

    const componentMeta = componentInstanceName
      ? `(instance of ${componentInstanceName || 'a Component'})`
      : undefined

    const atomMeta = atomName ? `(${atomName})` : undefined
    const meta = componentMeta || atomMeta || ''

    return (
      <div>
        <Dropdown
          onVisibleChange={(visible) =>
            setContextMenuNodeId(visible ? element.id : null)
          }
          overlay={
            <TreeItemDropDownOverplay
              element={element}
              elementService={elementService}
              setContextMenuNodeId={setContextMenuNodeId}
            />
          }
          trigger={['contextMenu']}
          visible={contextMenuItemId === element.id}
        >
          <div css={isComponentInstance ? tw`text-blue-400` : `text-gray-400`}>
            {element.label} <span css={tw`text-xs`}>{meta}</span>
          </div>
        </Dropdown>
      </div>
    )
  },
)

interface TreeItemDropDownOverplayProps extends WithElementService {
  setContextMenuNodeId: (id: Nullable<string>) => void
  element: Element
}

const TreeItemDropDownOverplay = observer(
  ({
    setContextMenuNodeId,
    element,
    elementService,
  }: TreeItemDropDownOverplayProps) => {
    const closeMenu = () => setContextMenuNodeId(null)

    const onClick = (e: React.MouseEvent) => {
      closeMenu()
      e.stopPropagation()
    }

    return (
      <>
        <div css={tw`inset-0`} onClick={onClick} />
        <ElementContextMenu
          element={element}
          elementService={elementService}
          onClick={closeMenu}
        />
      </>
    )
  },
)
