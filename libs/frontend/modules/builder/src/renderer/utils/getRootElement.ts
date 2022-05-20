import {
  IComponentService,
  IElement,
  TypedValue,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'

export const getRootElement = (
  payload: TypedValue<any>,
  componentService: IComponentService,
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

  return componentService.elementTrees.get(component.id)?.root
}
