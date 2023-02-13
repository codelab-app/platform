import type {
  ICreateElementDTO,
  IElementRef,
} from '@codelab/frontend/abstract/core'
import { useDroppable } from '@dnd-kit/core'

export const useCreateElementDroppable = (
  id: IElementRef,
  input?: Omit<ICreateElementDTO, 'renderType'>,
) => {
  return useDroppable({
    id,
    data: {
      createElementInput: input,
    },
  })
}
