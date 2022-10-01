import {
  IComponentService,
  IElement,
  IElementService,
  TypedValue,
} from '@codelab/frontend/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'

export const getRootElement = (
  payload: TypedValue<any>,
  componentService: IComponentService,
  elementService: IElementService,
): Nullish<IElement> => {
  if (!payload) {
    return null
  }

  // .id is for backward compatibility
  const id = (payload as any).id || payload.value

  if (typeof id !== 'string') {
    return null
  }

  const component = id ? componentService?.component(id) : undefined

  if (!component) {
    return null
  }

  return elementService.elements.get(component.rootElementId)
}
