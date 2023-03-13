import type {
  IBuilderDataNode,
  IElementTree,
  IPageNode,
} from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Tree as AntdTree } from 'antd'
import has from 'lodash/has'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import { useElementTreeDrop } from '../../../hooks'
import { antdTreeStyle } from './antdTree.styles'
import { BuilderTreeItemTitle } from './BuilderTreeItem-Title'
import {
  DISABLE_HOVER_CLASSNAME,
  disableTreeNodeWrapperHoverStyle,
  TREE_NODE_WRAPPER_SELECTOR,
} from './disableNodeHoverEffects'

interface BuilderTreeProps {
  treeData: IBuilderDataNode | undefined
  className?: string
  elementTree: IElementTree | null
  expandedNodeIds: Array<string>
  setActiveTree: () => void
  setExpandedNodeIds: (ids: Array<string>) => void
  selectTreeNode(node: Nullable<IPageNode>): void
}

/**
 * When you think about it, the only dependency a BuilderTree should have is the data. All other services or data is only supporting infrastructure
 */
export const BuilderTree = observer<BuilderTreeProps>(
  ({
    className,
    elementTree,
    expandedNodeIds,
    selectTreeNode,
    setActiveTree,
    setExpandedNodeIds,
    treeData,
  }) => {
    const { builderService, componentService, elementService } = useStore()
    const selectedNode = builderService.selectedNode
    const { handleDrop, isMoving } = useElementTreeDrop(elementService)

    const selectComponentNode = (node: IPageNode) => {
      selectTreeNode(node)
    }

    const componentContextMenuProps = useMemo(
      () => ({
        deleteModal: componentService.deleteModal,
      }),
      [componentService.deleteModal],
    )

    const elementContextMenuProps = useMemo(
      () => ({
        cloneElement: elementService.cloneElement.bind(elementService),
        convertElementToComponent:
          elementService.convertElementToComponent.bind(elementService),
        createModal: elementService.createModal,
        deleteModal: elementService.deleteModal,
        elementTree,
      }),
      [elementTree, elementService],
    )

    return (
      <AntdTree<IBuilderDataNode>
        blockNode
        className={`${className} draggable-tree`}
        css={[disableTreeNodeWrapperHoverStyle, antdTreeStyle]}
        disabled={isMoving}
        draggable={{
          icon: false,
          // nodeDraggable: (node: AntTreeNode) => {
          //   // Only real nodes have uuid
          //   return checkIfValidUUID(node)
          // },
        }}
        // disabled={isMoving}
        expandedKeys={expandedNodeIds}
        onClick={(event) => event.stopPropagation()}
        onDrop={handleDrop}
        onExpand={(expandedKeys) => {
          return setExpandedNodeIds(expandedKeys as Array<string>)
        }}
        onMouseEnter={({ event, node }) => {
          // Selectable by default, unless it's not
          if (has(node, 'selectable') && !node.selectable) {
            const target = event.target as Element
            // This is where the hover effect is set
            const treeNodeWrapper = target.closest(TREE_NODE_WRAPPER_SELECTOR)
            treeNodeWrapper?.classList.add(DISABLE_HOVER_CLASSNAME)
          }

          builderService.setHoveredNode(elementRef(node.key.toString()))
        }}
        onMouseLeave={() => builderService.setHoveredNode(null)}
        onSelect={([id], { nativeEvent, node }) => {
          console.log(id, node)
          nativeEvent.stopPropagation()

          setActiveTree()

          if (!id) {
            return
          }

          selectTreeNode(node.node)
        }}
        selectedKeys={selectedNode ? [selectedNode.id] : []}
        titleRender={(data) => {
          return (
            <BuilderTreeItemTitle
              componentContextMenuProps={componentContextMenuProps}
              data={data}
              elementContextMenuProps={elementContextMenuProps}
              node={data.node}
            />
          )
        }}
        treeData={treeData ? [treeData] : []}
      />
    )
  },
)

BuilderTree.displayName = 'BuilderTree'
