import {
  COMPONENT_NODE_TYPE,
  ELEMENT_NODE_TYPE,
  IBuilderDataNode,
  IElementTree,
  INode,
} from '@codelab/frontend/abstract/core'
import { componentRef } from '@codelab/frontend/domain/component'
import { elementRef } from '@codelab/frontend/domain/element'
import { useStore } from '@codelab/frontend/presenter/container'
import { Nullable } from '@codelab/shared/abstract/types'
import { Tree as AntdTree } from 'antd'
import { EventDataNode } from 'antd/lib/tree'
import has from 'lodash/has'
import { observer } from 'mobx-react-lite'
import React, { Ref } from 'react'
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
      const element = elementService.elements.get(node.key.toString())

      if (element) {
        selectTreeNode(elementRef(element))
      }
    }

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
        onClick={(e) => e.stopPropagation()}
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
              componentContextMenuProps={{
                deleteModal: componentService.deleteModal,
              }}
              data={data}
              elementContextMenuProps={{
                createModal: elementService.createModal,
                deleteModal: elementService.deleteModal,
                cloneElement: elementService.cloneElement.bind(elementService),
                convertElementToComponent:
                  elementService.convertElementToComponent.bind(elementService),
                elementTree,
              }}
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
