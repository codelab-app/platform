import type { IElementDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { useDroppable } from '@dnd-kit/core'

export const useCreateElementDroppable = (
  { id }: IEntity,
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
