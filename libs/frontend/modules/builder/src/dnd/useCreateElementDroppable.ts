import { CreateElementInput } from '@codelab/frontend/modules/element'
import { useDroppable } from '@dnd-kit/core'
import { BuilderDndType } from './BuilderDndType'
import { BuilderDragData } from './BuilderDragData'

export const useCreateElementDroppable = (
  id: string,
  input: CreateElementInput,
) => {
  const data: BuilderDragData = {
    type: BuilderDndType.CreateElement,
    createElementInput: input,
  }

  return useDroppable({
    id,
    data,
  })
}
