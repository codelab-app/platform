import { CreateElementInput } from '@codelab/shared/abstract/codegen'
import { BuilderDndType } from './BuilderDndType'

export type BuilderDragData = {
  type: BuilderDndType.CreateElement
  createElementInput: CreateElementInput
}
