import {
  BuilderDndType,
  IBuilderComponent,
  ICreateElementDTO,
  IElementRef,
} from '@codelab/shared/abstract/core'
import { useDraggable } from '@dnd-kit/core'

export const useCreateElementDraggable = (
  id: IElementRef,
  createElementInput: Omit<ICreateElementDTO, 'owner'>,
  component: Pick<IBuilderComponent, 'name' | 'icon'>,
) => {
  return useDraggable({
    id: id,
    data: {
      name: component.name,
      icon: component.icon,
      type: BuilderDndType.CreateElement,
      createElementInput,
    },
  })
}
