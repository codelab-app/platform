import type {
  IElementTreeViewDataNode,
  IPageNode,
} from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/abstract/core'
import { CuiTree } from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import type { Nullable } from '@codelab/shared/abstract/types'
import has from 'lodash/has'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import { useElementTreeDrop } from '../../../hooks'
import {
  DISABLE_HOVER_CLASSNAME,
  TREE_NODE_WRAPPER_SELECTOR,
} from './disable-node-hover-effects'
import { ElementTreeItemTitle } from './ElementTreeItemTitle'

interface ElementTreeViewProps {
  expandedNodeIds: Array<string>
  treeData: IElementTreeViewDataNode | undefined

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
export const ElementTreeView = observer<ElementTreeViewProps>(
  ({
    expandedNodeIds,
    selectTreeNode,
    setActiveTab,
    setExpandedNodeIds,
    treeData,
  }) => {
    const { builderService, elementService } = useStore()
    const selectedNode = builderService.selectedNode
    const { handleDrop, isMoving } = useElementTreeDrop(elementService)

    const elementContextMenuProps = useMemo(
      () => ({
        cloneElement: elementService.cloneElement.bind(elementService),
        convertElementToComponent:
          elementService.convertElementToComponent.bind(elementService),
        createForm: elementService.createForm,
        deleteModal: elementService.deleteModal,
      }),
      [elementService],
    )

    return (
      <CuiTree<IElementTreeViewDataNode>
        defaultExpandAll
        disabled={isMoving}
        draggable={true}
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

          node.key.toString() !== 'components' &&
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
          return (
            <ElementTreeItemTitle
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

ElementTreeView.displayName = 'ElementTree'
