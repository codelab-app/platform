import { ElementTree } from '@codelab/frontend/modules/element'
import { Nullable } from '@codelab/shared/abstract/types'
import { Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import { DataNode } from 'rc-tree/lib/interface'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { useExpandedNodes } from '../../../hooks'
import { WithBuilderService } from '../../../store/BuilderService'
import { ElementContextMenu } from '../ElementContextMenu'

type MainPaneBuilderTreeTabProps = WithBuilderService

export const MainPaneBuilderTreeTab = observer<MainPaneBuilderTreeTabProps>(
  ({ builderService }) => {
    const { setExpandedNodeIds, expandedNodeIds } =
      useExpandedNodes(builderService)

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
  },
)

MainPaneBuilderTreeTab.displayName = 'MainPaneBuilderTreeTab'

interface TreeItemTitleProps {
  node: DataNode
  tree: ElementTree
}

interface TreeItemDropDownOverplayProps {
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
