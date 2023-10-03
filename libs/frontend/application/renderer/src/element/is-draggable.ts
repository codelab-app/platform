import type {
  IElementModel,
  IPropDataByElementId,
} from '@codelab/frontend/abstract/domain'
import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/domain'

export interface IsDraggableProps {
  element: IElementModel
  globalPropsContext: IPropDataByElementId
  isBuilder: boolean
}

/**
 * We only apply dnd to the root element of a component or elements not inside a component
 */
export const isDraggable = (props: IsDraggableProps) => {
  const isComponentDescendant = Boolean(
    props.globalPropsContext[DATA_COMPONENT_ID],
  )

  const isComponentRootElement =
    props.element.parentComponent && isComponentDescendant

  return props.isBuilder && (isComponentRootElement || !isComponentDescendant)
}
