import {
  BUILDER_SERVICE,
  COMPONENT_TREE_CONTAINER,
  ELEMENT_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/modules/element'
import { IBuilderService, IElementService } from '@codelab/shared/abstract/core'
import { checkIfValidUUID } from '@codelab/shared/utils'
import { css } from '@emotion/react'
import { Tree as AntdTree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import { AntTreeNodeProps } from 'antd/lib/tree/Tree'
import { has } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { Key, useRef, useState } from 'react'
import { useElementTreeDrop, useExpandedNodes } from '../../../hooks'
import { ElementContextMenuProps } from '../ElementContextMenu'
import { BuilderTreeItemTitle } from './BuilderTreeItemTitle'
import {
  DISABLE_HOVER_CLASSNAME,
  disableTreeNodeWrapperHoverStyle,
  TREE_NODE_WRAPPER_SELECTOR,
} from './disableNodeHoverEffects'

type BuilderTreeProps = {
  treeData?: DataNode
  elementContextMenuProps: Omit<ElementContextMenuProps, 'element'>
} & Pick<
  IBuilderService,
  | 'setHoveredElement'
  | 'set_selectedElement'
  | 'selectedElement'
  | 'builderRenderer'
> &
  Pick<IElementService, 'element' | 'elementTree' | 'moveElement'>

export const BuilderTree = observer<BuilderTreeProps>(
  ({
    elementContextMenuProps,
    treeData,
    setHoveredElement,
    set_selectedElement,
    selectedElement,
    element,
    builderRenderer,
    elementTree,
    moveElement,
  }) => {
    const { setExpandedNodeIds, expandedNodeIds } = useExpandedNodes({
      selectedElement,
      builderRenderer,
    })

    const { isMoving, handleDrop } = useElementTreeDrop({
      elementTree,
      moveElement,
    })

    return (
      <AntdTree
        blockNode
        className="draggable-tree"
        css={[disableTreeNodeWrapperHoverStyle]}
        disabled={isMoving}
        draggable={{
          icon: false,
          nodeDraggable: (node: AntTreeNodeProps) => {
            // Only real nodes have uuid
            return checkIfValidUUID(node?.key)
          },
        }}
        expandedKeys={expandedNodeIds}
        onClick={(e) => e.stopPropagation()}
        onDrop={handleDrop}
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

          if (id) {
            set_selectedElement(elementRef(id.toString()))
          }
        }}
        selectedKeys={selectedElement ? [selectedElement.id] : []}
        titleRender={(node) => {
          return (
            <BuilderTreeItemTitle
              element={element(node.key.toString())}
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

BuilderTree.displayName = 'MainPaneBuilderTreeTab'
