import { CreateElementInput } from '@codelab/frontend/abstract/codegen'
import { BuilderDndType } from './BuilderDndType'

export type BuilderDragData = {
  type: BuilderDndType.CreateElement
  createElementInput: CreateElementInput
}
