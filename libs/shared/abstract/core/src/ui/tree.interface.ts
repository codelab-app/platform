import { DataNode } from 'antd/lib/tree'
import * as React from 'react'
import {
  COMPONENT_NODE_TYPE,
  ELEMENT_NODE_TYPE,
  STORE_NODE_TYPE,
} from '../base/node.interface'

export interface IBuilderDataNode extends DataNode {
  /**
   * We require our own node type, this is used for polymorphism.
   *
   * - Context menus (different for element vs component)
   */
  type: COMPONENT_NODE_TYPE | ELEMENT_NODE_TYPE | STORE_NODE_TYPE | null
  // This is the id
  key: string | number
  title?: React.ReactNode
  children?: Array<IBuilderDataNode>
}
