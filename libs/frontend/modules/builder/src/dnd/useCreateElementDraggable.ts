import {
  BuilderDndType,
  ICreateElementDTO,
  IElementRef,
} from '@codelab/shared/abstract/core'
import { useDraggable } from '@dnd-kit/core'

export const useCreateElementDraggable = (
  id: IElementRef,
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
