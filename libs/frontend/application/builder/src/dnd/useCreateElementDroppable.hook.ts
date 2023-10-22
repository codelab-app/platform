import type { IElementDTO, IRef } from '@codelab/shared/abstract/core'
import { useDroppable } from '@dnd-kit/core'

export const useCreateElementDroppable = (
  { id }: IRef,
  input: Omit<
    IElementDTO,
    'closestContainerNode' | 'id' | 'name' | 'props' | 'renderType'
  >,
) => {
  return useDroppable({
    data: {
      createElementInput: input,
    },
    id,
  })
}
