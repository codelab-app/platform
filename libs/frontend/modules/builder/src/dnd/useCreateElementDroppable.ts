import { ICreateElementDTO } from '@codelab/shared/abstract/core'
import { useDroppable } from '@dnd-kit/core'
import { BuilderDndType } from './BuilderDndType'
import { BuilderDragData } from './BuilderDragData'

export const useCreateElementDroppable = (
  id: string,
  input: ICreateElementDTO,
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
