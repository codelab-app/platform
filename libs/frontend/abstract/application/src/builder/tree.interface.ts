import type * as React from 'react'
import type { IRuntimeModel } from '../renderer'

export interface IElementTreeViewDataNode {
  children?: Array<IElementTreeViewDataNode>
  isChildMapperComponentInstance?: boolean
  // This is the id
  key: number | string
  /**
   * We require our own node type, this is used for polymorphism.
   *
   * - Context menus (different for element vs component)
   */
  node: IRuntimeModel | null
  primaryTitle?: string
  rootKey: string | null
  secondaryTitle?: string
  selectable?: boolean
  tags?: React.ReactNode
  title?: string
  toolbar?: React.ReactNode
}
