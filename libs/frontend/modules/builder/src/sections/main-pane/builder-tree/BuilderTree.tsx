import { elementRef } from '@codelab/frontend/modules/element'
import {
  COMPONENT_NODE_TYPE,
  ELEMENT_NODE_TYPE,
  IBuilderDataNode,
  IBuilderService,
  IComponentService,
  IElementService,
  IElementTree,
  IRenderService,
} from '@codelab/shared/abstract/core'
import { checkIfValidUUID } from '@codelab/shared/utils'
import { Tree as AntdTree } from 'antd'
import { AntTreeNodeProps } from 'antd/lib/tree/Tree'
import { has } from 'lodash'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useElementTreeDrop, useExpandedNodes } from '../../../hooks'
import { ComponentContextMenuProps } from '../ComponentContextMenu'
import { ElementContextMenuProps } from '../ElementContextMenu'
import { BuilderTreeItemTitle } from './BuilderTreeItemTitle'
import {
  DISABLE_HOVER_CLASSNAME,
  disableTreeNodeWrapperHoverStyle,
  TREE_NODE_WRAPPER_SELECTOR,
} from './disableNodeHoverEffects'

type BuilderTreeProps = {
  treeData?: IBuilderDataNode
  elementContextMenuProps: Omit<ElementContextMenuProps, 'element'>
  componentContextMenuProps: Omit<ComponentContextMenuProps, 'component'>
  className?: string
  elementTree: IElementTree
  renderService: IRenderService
  // Allows us to set which tree is active, used by tabs
  setActiveTree: () => void
} & Pick<
  IBuilderService,
  'setHoveredElement' | 'setSelectedTreeNode' | 'selectedElement'
> &
  Pick<IElementService, 'element' | 'moveElement'> &
  Pick<IComponentService, 'component'>

export const BuilderTree = observer<BuilderTreeProps>(
  ({
    className,
    elementContextMenuProps,
    componentContextMenuProps,
    treeData,
    setHoveredElement,
    setSelectedTreeNode,
    selectedElement,
    element: getElement,
    component: getComponent,
    renderService,
    elementTree,
    moveElement,
    setActiveTree,
  }) => {
    const { setExpandedNodeIds, expandedNodeIds } = useExpandedNodes({
      selectedElement,
      elementTree: renderService.tree,
    })

    const { isMoving, handleDrop } = useElementTreeDrop({
      elementTree,
      moveElement,
    })

    return (
      <AntdTree<IBuilderDataNode>
        blockNode
        className={`${className} draggable-tree`}
        css={[disableTreeNodeWrapperHoverStyle]}
        // disabled={isMoving}
        draggable={{
          icon: false,
          nodeDraggable: (node: AntTreeNodeProps) => {
            // Only real nodes have uuid
            return checkIfValidUUID(node?.key)
          },
        }}
        expandedKeys={expandedNodeIds}
        onClick={(e) => e.stopPropagation()}
        // onDrop={handleDrop}
        onExpand={(expandedKeys) => {
          return setExpandedNodeIds(expandedKeys)
        }}
        onMouseEnter={({ node, event }) => {
          // Selectable by default, unless it's not
          if (has(node, 'selectable') && !node.selectable) {
            const target = event.target as Element
            // This is where the hover effect is set
            const treeNodeWrapper = target.closest(TREE_NODE_WRAPPER_SELECTOR)
            treeNodeWrapper?.classList.add(DISABLE_HOVER_CLASSNAME)
          }

          setHoveredElement(elementRef(node.key.toString()))
        }}
        onMouseLeave={() => setHoveredElement(null)}
        onSelect={([id], { nativeEvent, node }) => {
          nativeEvent.stopPropagation()

          setActiveTree()

          if (id) {
            // Limitation to typing here
            setSelectedTreeNode(node as unknown as IBuilderDataNode)
          }
        }}
        selectedKeys={selectedElement ? [selectedElement.id] : []}
        titleRender={(data) => {
          let node

          if (data.type === COMPONENT_NODE_TYPE) {
            node = getComponent(data.key.toString())
          }

          if (data.type === ELEMENT_NODE_TYPE) {
            node = getElement(data.key.toString())
          }

          return (
            <BuilderTreeItemTitle
              componentContextMenuProps={componentContextMenuProps}
              data={data}
              elementContextMenuProps={elementContextMenuProps}
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
