import type { DirectoryTreeProps } from 'antd/es/tree'
import type { ReactNode } from 'react'

import type { Variant } from '../../abstract'
import type { FilterOptions } from './store'

export type WithChildren<T> = T & {
  children?: Array<WithChildren<T>>
}

export interface CuiTreeProps<T extends WithChildren<CuiTreeBasicDataNode>>
  extends DirectoryTreeProps<T> {
  draggable?: boolean

  /**
   * Allows local filtering of tree data by primary and secondary titles
   */
  filter?: FilterOptions
  isLoading?: boolean
  treeData?: Array<T>
  onSearchKeywordChange?(keyword: string): void
}
export interface CuiTreeBasicDataNode {
  checkable?: boolean
  /** Set style of TreeNode. This is not recommend if you don't have any force requirement */
  className?: string
  disableCheckbox?: boolean
  disabled?: boolean
  highlight?: {
    primaryTitle?: string
    secondaryTitle?: string
  }
  icon?: ReactNode
  isLeaf?: boolean
  key: number | string
  primaryTitle?: string
  secondaryTitle?: string
  selectable?: boolean
  style?: React.CSSProperties
  switcherIcon?: ReactNode
  tags?: ReactNode
  toolbar?: ReactNode
  variant?: Variant
}
