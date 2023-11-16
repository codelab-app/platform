import type { IElementDTO } from '@codelab/shared/abstract/core'
import type { ReactNode } from 'react'
import type { BuilderDndAction } from './builder-dnd-action'

export interface BuilderDragData {
  action: BuilderDndAction
  createElementInput?: IElementDTO
  icon?: string
  name?: string
  overlayRenderer(): ReactNode
}
