import type { DataNode } from 'antd/lib/tree'
import type * as React from 'react'
import type {
  COMPONENT_NODE_TYPE,
  ELEMENT_NODE_TYPE,
} from '../base/node.interface'

export interface IBuilderDataNode extends DataNode {
  /**
   * We require our own node type, this is used for polymorphism.
   *
   * - Context menus (different for element vs component)
   */
  type: COMPONENT_NODE_TYPE | ELEMENT_NODE_TYPE | null
  // This is the id
  key: string | number
  title?: React.ReactNode
  children?: Array<IBuilderDataNode>
  rootKey: string | null
}
