import type {
  IBuilderDataNode,
  IElementTree,
  IPageNodeRef,
} from '@codelab/frontend/abstract/core'
import {
  componentRef,
  elementRef,
  isComponentPageNode,
  isElementPageNode,
} from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Tree as AntdTree } from 'antd'
import type { EventDataNode } from 'antd/lib/tree'
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
  setActiveTree: () => void
  setExpandedNodeIds: (ids: Array<string>) => void
  selectTreeNode(node: Nullable<IPageNodeRef>): void
  expandedNodeIds: Array<string>
}

/**
 * When you think about it, the only dependency a BuilderTree should have is the data. All other services or data is only supporting infrastructure
 */
export const BuilderTree = observer<BuilderTreeProps>(
  ({
    className,
    treeData,
    elementTree,
    setActiveTree,
    setExpandedNodeIds,
    expandedNodeIds,
    selectTreeNode,
  }) => {
    const { elementService, builderService, componentService } = useStore()
    const selectedNode = builderService.selectedNode
    const { isMoving, handleDrop } = useElementTreeDrop(elementService)

    const selectComponentNode = (node: EventDataNode<IBuilderDataNode>) => {
      const component = componentService.components.get(node.key.toString())

      if (component) {
        selectTreeNode(componentRef(component.id))
      }
    }

    const selectElementNode = (node: EventDataNode<IBuilderDataNode>) => {
      const element = elementService.maybeElement(node.key.toString())

      if (element) {
        selectTreeNode(elementRef(element.id))
      }
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
        onMouseEnter={({ node, event }) => {
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

          if (isComponentPageNode(node.node)) {
            selectComponentNode(node)
          }

          if (isElementPageNode(node.node)) {
            selectElementNode(node)
          }
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
