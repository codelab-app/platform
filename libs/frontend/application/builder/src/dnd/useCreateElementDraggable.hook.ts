import type {
  BuilderDndType,
  IBuilderComponent,
  IElementRef,
} from '@codelab/frontend/abstract/domain'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { useDraggable } from '@dnd-kit/core'

export interface UseCreateElementDraggableProps {
  component?: Pick<IBuilderComponent, 'icon' | 'name'>
  createElementInput?: Omit<
    IElementDTO,
    'closestContainerNode' | 'id' | 'props'
  >
  id: IElementRef
  type?: BuilderDndType
  overlayRenderer?(): JSX.Element
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
