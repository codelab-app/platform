import {
  Element,
  elementRef,
  WithElementService,
} from '@codelab/frontend/modules/element'
import { Nullable } from '@codelab/shared/abstract/types'
import { Dropdown, Tree as AntdTree } from 'antd'
import { observer } from 'mobx-react-lite'
import { DataNode } from 'rc-tree/lib/interface'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { useElementTreeDrop, useExpandedNodes } from '../../../hooks'
import { WithBuilderService } from '../../../store/BuilderService'
import { ElementContextMenu } from '../ElementContextMenu'

type MainPaneBuilderTreeTabProps = WithBuilderService & WithElementService

export const MainPaneBuilderTreeTab = observer<MainPaneBuilderTreeTabProps>(
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
