import {
  BuilderDndType,
  BuilderDragData,
  ICreateElementDTO,
  IElementRef,
} from '@codelab/shared/abstract/core'
import { useDroppable } from '@dnd-kit/core'

export const useCreateElementDroppable = (
  id: IElementRef,
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
