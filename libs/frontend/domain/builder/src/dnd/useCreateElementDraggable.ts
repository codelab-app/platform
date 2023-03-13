import type {
  BuilderDndType,
  IBuilderComponent,
  ICreateElementData,
  IElementRef,
} from '@codelab/frontend/abstract/core'
import { useDraggable } from '@dnd-kit/core'

export interface UseCreateElementDraggableProps {
  component?: Pick<IBuilderComponent, 'icon' | 'name'>
  createElementInput?: Omit<ICreateElementData, 'id'>
  id: IElementRef
  overlayRenderer?(): JSX.Element
  type?: BuilderDndType
}

export const useCreateElementDraggable = ({
  component,
  createElementInput,
  id,
  overlayRenderer,
  type,
}: UseCreateElementDraggableProps) => {
  return useDraggable({
    data: {
      createElementInput,
      icon: component?.icon,
      name: component?.name,
      overlayRenderer,
      type,
    },
    id: id,
  })
}
