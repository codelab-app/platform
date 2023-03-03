import type {
  BuilderDndType,
  IBuilderComponent,
  ICreateElementData,
  IElementRef,
} from '@codelab/frontend/abstract/core'
import { useDraggable } from '@dnd-kit/core'

export interface UseCreateElementDraggableProps {
  id: IElementRef
  createElementInput?: Omit<ICreateElementData, 'id'>
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
