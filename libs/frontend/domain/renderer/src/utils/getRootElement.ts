import type {
  IComponentService,
  IElement,
  IElementService,
  TypedValue,
} from '@codelab/frontend/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'

export const getRootElement = (
  payload: TypedValue<unknown>,
  componentService: IComponentService,
  elementService: IElementService,
): Nullish<IElement> => {
  // .id is for backward compatibility
  const id = payload.value

  if (typeof id !== 'string') {
    return null
  }

  const component = id ? componentService.component(id) : undefined

  if (!component) {
    return null
  }

  return elementService.element(component.rootElement.id)
}
