import type {
  IBuilderDataNode,
  IElementTree,
  INode,
} from '@codelab/frontend/abstract/core'
import {
  COMPONENT_NODE_TYPE,
  componentRef,
  ELEMENT_NODE_TYPE,
} from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/domain/element'
import { useStore } from '@codelab/frontend/presenter/container'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Tree as AntdTree } from 'antd'
import type { EventDataNode } from 'antd/lib/tree'
import has from 'lodash/has'
import { observer } from 'mobx-react-lite'
import type { Ref } from 'react'
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
  selectTreeNode(node: Nullable<Ref<INode>>): void
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
        selectTreeNode(componentRef(component))
      }
    }

    const selectElementNode = (node: EventDataNode<IBuilderDataNode>) => {
      const element = elementService.maybeElement(node.key.toString())

      if (element) {
        selectTreeNode(elementRef(element))
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

          builderService.set_hoveredNode(elementRef(node.key.toString()))
        }}
        onMouseLeave={() => builderService.set_hoveredNode(null)}
        onSelect={([id], { nativeEvent, node }) => {
          nativeEvent.stopPropagation()

          setActiveTree()

          if (!id) {
            return
          }

          if (node.type === COMPONENT_NODE_TYPE) {
            selectComponentNode(node)
          }

          if (node.type === ELEMENT_NODE_TYPE) {
            selectElementNode(node)
          }
        }}
        selectedKeys={selectedNode ? [selectedNode.id] : []}
        titleRender={(data) => {
          let node

          if (data.type === COMPONENT_NODE_TYPE) {
            node = componentService.component(data.key.toString())
          }

          if (data.type === ELEMENT_NODE_TYPE) {
            node = elementService.element(data.key.toString())
          }

          return (
            <BuilderTreeItemTitle
              builderService={builderService}
              componentContextMenuProps={componentContextMenuProps}
              data={data}
              elementContextMenuProps={elementContextMenuProps}
              elementService={elementService}
              node={node}
            />
          )
        }}
        treeData={treeData ? [treeData] : []}
      />
    )
  },
)

BuilderTree.displayName = 'BuilderTree'
