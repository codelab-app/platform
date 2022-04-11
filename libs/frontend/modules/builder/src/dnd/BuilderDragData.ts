import { ICreateElementDTO } from '@codelab/shared/abstract/core'
import { BuilderDndType } from './BuilderDndType'

export type BuilderDragData = {
  type: BuilderDndType.CreateElement
  createElementInput: ICreateElementDTO
}
