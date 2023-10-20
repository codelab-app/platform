import type { DataNode } from 'antd/lib/tree'
import type { MutableRefObject } from 'react'
import { css } from 'styled-components'

export const DISABLE_HOVER_CLASSNAME = 'disable-hover'

export const TREE_NODE_WRAPPER_SELECTOR = '.ant-tree-node-content-wrapper'

export const addUnselectableNodeClassName = (
  node: DataNode,
  treeNodeWrapper: Element | null,
) => {
  const isSelectable = node.selectable
  // Wrapper is where the hover effect is set

  if (!isSelectable) {
    treeNodeWrapper?.classList.add(DISABLE_HOVER_CLASSNAME)
  }
}

/**
 * We need to watch the wrapper class's className for changes, so we can always update the disable hover class
 */
export const getTreeNodeWrapper = (
  ref: MutableRefObject<HTMLDivElement | null>,
) => {
  return ref.current?.closest(TREE_NODE_WRAPPER_SELECTOR) ?? null
}

/**
 * Disable all hover effects by default, use onMouseEnter to re-add them
 */
export const disableTreeNodeWrapperHoverStyle = css`
  // - DataNode.selectable false should disable hover effects
  ${TREE_NODE_WRAPPER_SELECTOR}.${DISABLE_HOVER_CLASSNAME} {
    background-color: initial !important;
    cursor: initial !important;
  }
`
