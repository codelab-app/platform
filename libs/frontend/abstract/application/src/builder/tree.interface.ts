import type { IRef } from '@codelab/shared/abstract/core'
import type * as React from 'react'

export enum IRuntimeNodeType {
  Component = 'Component',
  Element = 'Element',
}

export interface IElementTreeViewDataNode {
  atomMeta?: string
  children: Array<IElementTreeViewDataNode>
  // use ids instead of models because models gets detached/deleted which causes issues
  component?: IRef
  componentMeta?: string
  // use ids instead of models because models gets detached/deleted which causes issues
  element?: IRef
  errorMessage?: string
  isChildMapperComponentInstance?: boolean
  // use ids instead of models because models gets detached/deleted which causes issues
  key: string
  // node: IRuntimeModel | null
  primaryTitle?: string
  rootKey: string | null
  secondaryTitle?: string
  selectable?: boolean
  tags?: React.ReactNode
  title?: string
  toolbar?: React.ReactNode
  type: IRuntimeNodeType
}

export type IElementTreeViewDataNodePreview = Pick<
  IElementTreeViewDataNode,
  'element' | 'key'
>
