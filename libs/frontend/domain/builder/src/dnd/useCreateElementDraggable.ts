import type {
  BuilderDndType,
  IBuilderComponent,
  ICreateElementDTO,
  IElementRef,
} from '@codelab/frontend/abstract/core'
import { useDraggable } from '@dnd-kit/core'

export interface UseCreateElementDraggableProps {
  id: IElementRef
  createElementInput?: Omit<ICreateElementDTO, 'id' | 'owner'>
  component?: Pick<IBuilderComponent, 'name' | 'icon'>
  type?: BuilderDndType
  overlayRenderer?: () => JSX.Element
}

export const useCreateElementDraggable = ({
  id,
  createElementInput,
  component,
  overlayRenderer,
  type,
}: UseCreateElementDraggableProps) => {
  return useDraggable({
    id: id,
    data: {
      name: component?.name,
      icon: component?.icon,
      type,
      createElementInput,
      overlayRenderer,
    },
  })
}
