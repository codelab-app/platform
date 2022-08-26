import { elementRef } from '@codelab/frontend/modules/element'
import { componentRef, useStore } from '@codelab/frontend/presenter/container'
import {
  COMPONENT_NODE_TYPE,
  ELEMENT_NODE_TYPE,
  IBuilderDataNode,
  IElementTree,
} from '@codelab/shared/abstract/core'
import { Tree as AntdTree } from 'antd'
import { has } from 'lodash'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useElementTreeDrop } from '../../../hooks'
import { antdTreeStyle } from './antdTree.styles'
import { BuilderTreeItemTitle } from './BuilderTreeItem-Title'
import {
  DISABLE_HOVER_CLASSNAME,
  disableTreeNodeWrapperHoverStyle,
  TREE_NODE_WRAPPER_SELECTOR,
} from './disableNodeHoverEffects'

type BuilderTreeProps = {
  treeData: IBuilderDataNode | undefined
  className?: string
  elementTree: IElementTree | null
  setActiveTree: () => void
  setExpandedNodeIds: (ids: Array<string>) => void
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
  }) => {
    const {
      elementLinkService,
      elementService,
      builderService,
      componentService,
    } = useStore()

    const selectedNode = builderService.selectedNode
    const { isMoving, handleDrop } = useElementTreeDrop(elementLinkService)

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

          const dataNode = node as unknown as IBuilderDataNode

          if (dataNode.type === COMPONENT_NODE_TYPE) {
            const component = componentService.components.get(id.toString())

            component &&
              builderService.set_selectedNode(componentRef(component))
          }

          if (dataNode.type === ELEMENT_NODE_TYPE) {
            const element = elementService.elements.get(id.toString())

            element && builderService.set_selectedNode(elementRef(element))
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
                duplicateElement:
                  elementService.duplicateElement.bind(elementService),
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
