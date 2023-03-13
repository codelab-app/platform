import type { DataNode } from 'antd/lib/tree'
import type * as React from 'react'
import type { IPageNode } from '../domain'

export interface IBuilderDataNode extends DataNode {
  children?: Array<IBuilderDataNode>
  // This is the id
  key: number | string
  /**
   * We require our own node type, this is used for polymorphism.
   *
   * - Context menus (different for element vs component)
   */
  node: IPageNode | null
  rootKey: string | null
  title?: React.ReactNode
}
