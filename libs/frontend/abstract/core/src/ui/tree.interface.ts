import type { DataNode } from 'antd/lib/tree'
import type * as React from 'react'
import type { IPageNode } from '../domain'

export interface IBuilderDataNode extends DataNode {
  /**
   * We require our own node type, this is used for polymorphism.
   *
   * - Context menus (different for element vs component)
   */
  node: IPageNode | null
  // This is the id
  key: string | number
  title?: React.ReactNode
  children?: Array<IBuilderDataNode>
  rootKey: string | null
}
