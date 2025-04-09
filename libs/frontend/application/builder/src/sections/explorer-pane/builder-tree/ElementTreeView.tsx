import type {
  type IBuilderRoute,
  type IElementTreeViewDataNode,
  IRuntimeComponentModel,
  type IRuntimeModel,
  IRuntimeNodeType,
  IRuntimePageModel,
  runtimeComponentRef,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Maybe } from 'graphql/jsutils/Maybe'

import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { useElementService } from '@codelab/frontend-application-element/services'
import { useSyncHistoryState } from '@codelab/frontend-application-shared-store/search-params'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useElementTreeDrop } from '../../../hooks'
import {
  DISABLE_HOVER_CLASSNAME,
  TREE_NODE_WRAPPER_SELECTOR,
} from './disable-node-hover-effects'
import { ElementTreeItemTitle } from './ElementTreeItemTitle'

interface ElementTreeViewProps {
  context: IBuilderRoute
  runtimeContainerNode: Maybe<IRuntimeComponentModel> | Maybe<IRuntimePageModel>
}

/**
 * When you think about it, the only dependency a BuilderTree should have is the data. All other services or data is only supporting infrastructure
 */
export const ElementTreeView = observer<ElementTreeViewProps>(
  ({ context, runtimeContainerNode }) => {
    const { builderService, rendererService, runtimeElementService } =
      useApplicationStore()

    const renderer = rendererService.activeRenderer?.current
    // const runtimeContainerNode = renderer?.runtimeContainerNode
    const antdTree = runtimeContainerNode?.runtimeRootElement.treeViewNode
    const { handleDrop, isMoving } = useElementTreeDrop()
    const selectedNode = builderService.selectedNode?.maybeCurrent

    return (
      <CuiTree<IElementTreeViewDataNode>
        allowDrop={(data) => {
          // Child mapper component instances cannot be moved around individually since they are
          // dynamically rendered and can't have NODE_SIBLING relationship to actual elements
          // They can only be moved around via the `childMapperPreviousSibling` field of the element
          return !data.dragNode.isChildMapperComponentInstance
        }}
        autoExpandParent={false}
        defaultSelectedKeys={selectedNode ? [selectedNode.compositeKey] : []}
        disabled={isMoving}
        draggable={true}
        expandedKeys={runtimeElementService.expandedKeys}
        onClick={(event) => {
          event.stopPropagation()
        }}
        onDrop={handleDrop}
        onExpand={(expandedKeys, { expanded, node }) => {
          runtimeElementService.runtimeElement(node.key)?.setExpanded(expanded)

          console.log(runtimeElementService.expandedKeys)
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
            const runtimeElement = runtimeElementService.runtimeElement(
              node.key,
            )

            builderService.setHoveredNode(runtimeElementRef(runtimeElement))
          }
        }}
        onMouseLeave={() => {
          builderService.setHoveredNode(null)
        }}
        onSelect={(selectedKeys, info) => {
          info.nativeEvent.stopPropagation()

          if (selectedKeys.length === 0) {
            return
          }

          // Use setTimeout to defer the state update to prevent React setState during render issues
          runInAction(() => {
            builderService.setSelectedNode(
              info.node.type === IRuntimeNodeType.Component
                ? runtimeComponentRef(info.node.key)
                : runtimeElementRef(info.node.key),
            )
          })
        }}
        titleRender={(data) => (
          <ElementTreeItemTitle context={context} data={data} />
        )}
        treeData={antdTree ? [antdTree] : []}
      />
    )
  },
)

ElementTreeView.displayName = 'ElementTree'
