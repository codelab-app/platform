import { CreateElementInput } from '@codelab/frontend/abstract/codegen'
import { useDraggable } from '@dnd-kit/core'
import { BuilderDndType } from './BuilderDndType'

export const useCreateElementDraggable = (
  id: string,
  createElementInput: CreateElementInput,
) => {
  return useDraggable({
    id: id,
    data: {
      type: BuilderDndType.CreateElement,
      createElementInput,
    },
  })
}
