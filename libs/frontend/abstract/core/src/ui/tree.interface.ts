import type * as React from 'react'
import type { IPageNode } from '../domain'

export interface IElementTreeDataNode {
  children?: Array<IElementTreeDataNode>
  // This is the id
  key: number | string
  /**
   * We require our own node type, this is used for polymorphism.
   *
   * - Context menus (different for element vs component)
   */
  node: IPageNode | null
  primaryTitle?: string
  rootKey: string | null
  secondaryTitle?: string
  selectable?: boolean
  tags?: React.ReactNode
  toolbar?: React.ReactNode
}
