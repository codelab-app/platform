import type {
  ICreateElementDTO,
  IElementRef,
} from '@codelab/frontend/abstract/core'
import { useDroppable } from '@dnd-kit/core'

export const useCreateElementDroppable = (
  id: IElementRef,
  input?: Omit<ICreateElementDTO, 'slug' | 'renderType'>,
) => {
  return useDroppable({
    id,
    data: {
      createElementInput: input,
    },
  })
}
