import {
  type IElementTreeViewDataNode,
  IRuntimeNodeType,
  RendererTab,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import { useStore } from '@codelab/frontend/application/shared/store'
import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import has from 'lodash/has'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useElementTreeDrop } from '../../../hooks'
import {
  DISABLE_HOVER_CLASSNAME,
  TREE_NODE_WRAPPER_SELECTOR,
} from './disable-node-hover-effects'
import { ElementTreeItemTitle } from './ElementTreeItemTitle'

/**
 * When you think about it, the only dependency a BuilderTree should have is the data. All other services or data is only supporting infrastructure
 */
export const ElementTreeView = observer<{
  treeData?: IElementTreeViewDataNode
}>(({ treeData }) => {
  const { builderService, runtimeComponentService, runtimeElementService } =
    useStore()

  const selectedNode = builderService.selectedNode
  const { handleDrop, isMoving } = useElementTreeDrop()

  return (
    <CuiTree<IElementTreeViewDataNode>
      allowDrop={(data) => {
        // Child mapper component instances cannot be moved around individually since they are
        // dynamically rendered and can't have NODE_SIBLING relationship to actual elements
        // They can only be moved around via the `childMapperPreviousSibling` field of the element
        return !data.dragNode.isChildMapperComponentInstance
      }}
      autoExpandParent={false}
      disabled={isMoving}
      draggable={true}
      expandedKeys={builderService.expandedElementTreeNodeIds}
      onClick={(event) => event.stopPropagation()}
      onDrop={handleDrop}
      onExpand={(expandedKeys) => {
        return builderService.setExpandedElementTreeNodeIds(
          expandedKeys as Array<string>,
        )
      }}
      onMouseEnter={({ event, node }) => {
        // Selectable by default, unless it's not
        if (has(node, 'selectable') && !node.selectable) {
          const target = event.target as Element
          // This is where the hover effect is set
          const treeNodeWrapper = target.closest(TREE_NODE_WRAPPER_SELECTOR)

          treeNodeWrapper?.classList.add(DISABLE_HOVER_CLASSNAME)
        }

        if (node.type !== IRuntimeNodeType.Component) {
          builderService.setHoveredNode(runtimeElementRef(node.key))
        }
      }}
      onMouseLeave={() => builderService.setHoveredNode(null)}
      onSelect={([id], { nativeEvent, node }) => {
        nativeEvent.stopPropagation()

        builderService.setActiveTab(RendererTab.Page)

        if (!id) {
          return
        }

        if (node.type === IRuntimeNodeType.Component) {
          builderService.selectComponentNode(
            runtimeComponentService.maybeRuntimeComponent(node.key),
          )
        }

        if (node.type === IRuntimeNodeType.Element) {
          builderService.selectElementNode(
            runtimeElementService.maybeRuntimeElement(node.key),
          )
        }
      }}
      selectedKeys={selectedNode ? [selectedNode.id] : []}
      titleRender={(data) => <ElementTreeItemTitle data={data} />}
      treeData={treeData ? [treeData] : []}
    />
  )
})

ElementTreeView.displayName = 'ElementTree'
