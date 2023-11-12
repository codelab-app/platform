import type { IElementDTO } from '@codelab/shared/abstract/core'

export enum BuilderDndAction {
  CreateElement = 'CreateElement',
  MoveElement = 'MoveElement',
}

export interface BuilderDragData {
  action: BuilderDndAction
  createElementInput?: IElementDTO
  icon?: string
  name?: string
}
