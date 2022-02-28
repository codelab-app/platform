import { CreateElementInput } from '@codelab/frontend/modules/element'
import { BuilderDndType } from './BuilderDndType'

export type BuilderDragData = {
  type: BuilderDndType.CreateElement
  createElementInput: CreateElementInput
}
