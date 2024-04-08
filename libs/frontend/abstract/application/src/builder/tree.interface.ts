import type { IRef } from '@codelab/shared/abstract/core'
import type * as React from 'react'

export enum IRuntimeNodeType {
  Component = 'Component',
  Element = 'Element',
}

export interface IElementTreeViewDataNode {
  children: Array<IElementTreeViewDataNode>
  // use store ids instead of models because modes gets detached/deleted which causes issues
  component?: IRef
  // use store ids instead of models because modes gets detached/deleted which causes issues
  element?: IRef
  isChildMapperComponentInstance?: boolean
  // use store ids instead of models because modes gets detached/deleted which causes issues
  key: string
  primaryTitle?: string
  rootKey: string | null
  secondaryTitle?: string
  selectable?: boolean
  tags?: React.ReactNode
  title?: string
  toolbar?: React.ReactNode
  type: IRuntimeNodeType
}
