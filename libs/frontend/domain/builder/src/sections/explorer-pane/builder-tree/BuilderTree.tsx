import type {
  IBuilderDataNode,
  IElement,
  IPageNode,
} from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { Tree as AntdTree } from 'antd'
import has from 'lodash/has'
import isNil from 'lodash/isNil'
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
  className?: string
  expandedNodeIds: Array<string>
  treeData: IBuilderDataNode | undefined

  selectTreeNode(node: Nullable<IPageNode>): void
  /**
   * Page/Component builder tab
   */
  setActiveTab(): void
  setExpandedNodeIds(ids: Array<string>): void
}

/**
 * When you think about it, the only dependency a BuilderTree should have is the data. All other services or data is only supporting infrastructure
 */
export const BuilderTree = observer<BuilderTreeProps>(
  ({
    className,
    expandedNodeIds,
    selectTreeNode,
    setActiveTab,
    setExpandedNodeIds,
    treeData,
  }) => {
    const { builderService, componentService, elementService } = useStore()
    const selectedNode = builderService.selectedNode
    const { handleDrop, isMoving } = useElementTreeDrop(elementService)

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
      }),
      [elementService],
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
          nativeEvent.stopPropagation()

          setActiveTab()

          if (!id) {
            return
          }

          selectTreeNode(node.node)
        }}
        selectedKeys={selectedNode ? [selectedNode.id] : []}
        titleRender={(data) => {
          // It seems when a treeData is updated after deleting an element, this function
          // will still run with the deleted element even if that element does not exist
          // anymore on the treeData prop

          // root node in the treeData is the "Body" or the "Components"
          const rootNode = treeData?.node as Maybe<IElement>
          const descendantElements = rootNode?.descendantElements ?? []

          const nodeExists = descendantElements.some(
            ({ id }) => id === data.key,
          )

          const isRoot = rootNode?.id === data.key || isNil(rootNode)

          if (nodeExists || isRoot) {
            return (
              <BuilderTreeItemTitle
                componentContextMenuProps={componentContextMenuProps}
                data={data}
                elementContextMenuProps={elementContextMenuProps}
                node={data.node}
              />
            )
          }

          return
        }}
        treeData={treeData ? [treeData] : []}
      />
    )
  },
)

BuilderTree.displayName = 'BuilderTree'
