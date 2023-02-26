import type {
  ICreateElementData,
  IElementRef,
} from '@codelab/frontend/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { useDroppable } from '@dnd-kit/core'

export const useCreateElementDroppable = (
  { id }: IEntity,
  input?: Omit<ICreateElementData, 'id' | 'name' | 'renderType'>,
) => {
  return useDroppable({
    id,
    data: {
      createElementInput: input,
    },
  })
}
