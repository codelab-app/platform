import { ICreateElementDTO } from '@codelab/shared/abstract/core'
import { useDraggable } from '@dnd-kit/core'
import { BuilderDndType } from './BuilderDndType'

export const useCreateElementDraggable = (
  id: string,
  createElementInput: ICreateElementDTO,
) => {
  return useDraggable({
    id: id,
    data: {
      type: BuilderDndType.CreateElement,
      createElementInput,
    },
  })
}
