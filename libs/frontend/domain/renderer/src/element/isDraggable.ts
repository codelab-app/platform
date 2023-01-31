import type {
  IElement,
  IPropDataByElementId,
} from '@codelab/frontend/abstract/core'
import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/core'

export interface IsDraggableProps {
  isBuilder: boolean
  element: IElement
  globalPropsContext: IPropDataByElementId
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
