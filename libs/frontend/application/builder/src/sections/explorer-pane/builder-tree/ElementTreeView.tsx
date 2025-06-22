import {
  type IBuilderRoute,
  type IElementTreeViewDataNode,
  IRuntimeNodeType,
  runtimeComponentRef,
  runtimeElementRef,
} from '@codelab/frontend-abstract-application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx-context'
import { CuiTree } from '@codelab/frontend-presentation-codelab-ui'
import { observer } from 'mobx-react-lite'

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
  treeData: IElementTreeViewDataNode
  context: IBuilderRoute
}>(({ context, treeData }) => {
  const { builderService, runtimeElementService } = useApplicationStore()
  const selectedNode = builderService.selectedNode?.current
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
      expandedKeys={runtimeElementService.expandedCompositeKeys}
      onClick={(event) => {
        event.stopPropagation()
      }}
      onDrop={handleDrop}
      onExpand={async (expandedKeys, { expanded, node }) => {
        const runtimeElement = runtimeElementService.runtimeElement(node.key)

        // Set the new expanded state
        runtimeElement.setExpanded(expanded)
      }}
      onMouseEnter={({ event, node }) => {
        // Selectable by default, unless it's not
        if ('selectable' in node && !node.selectable) {
          const target = event.target as Element
          // This is where the hover effect is set
          const treeNodeWrapper = target.closest(TREE_NODE_WRAPPER_SELECTOR)

          treeNodeWrapper?.classList.add(DISABLE_HOVER_CLASSNAME)
        }

        if (node.type !== IRuntimeNodeType.Component) {
          const runtimeElement = runtimeElementService.runtimeElement(node.key)

          builderService.setHoveredNode(runtimeElementRef(runtimeElement))
        }
      }}
      onMouseLeave={() => {
        builderService.setHoveredNode(null)
      }}
      onSelect={([id], { nativeEvent, node }) => {
        nativeEvent.stopPropagation()

        if (!id) {
          return
        }

        builderService.setSelectedNode(
          node.type === IRuntimeNodeType.Component
            ? runtimeComponentRef(node.key)
            : runtimeElementRef(node.key),
        )
      }}
      selectedKeys={selectedNode ? [selectedNode.compositeKey] : []}
      titleRender={(data) => (
        <ElementTreeItemTitle context={context} data={data} />
      )}
      treeData={[treeData]}
    />
  )
})

ElementTreeView.displayName = 'ElementTree'
