import type {
  IComponentService,
  IElement,
  TypedValue,
} from '@codelab/frontend/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'

export const getRootElement = (
  payload: TypedValue<unknown>,
  componentService: IComponentService,
): Nullish<IElement> => {
  const id = payload.value

  if (typeof id !== 'string') {
    return null
  }

  const component = componentService.components.get(id)

  return component?.rootElement.current
}
