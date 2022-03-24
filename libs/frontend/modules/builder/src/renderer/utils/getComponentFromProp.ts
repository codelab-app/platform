import { Element, ElementTree } from '@codelab/frontend/modules/element'
import { TypedValue } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'

export const getComponentRootElementFromProp = (
  payload: TypedValue<any>,
  tree: ElementTree,
): Nullish<Element> => {
  if (!payload) {
    return null
  }

  const id = (payload as any).id || payload.value // .id is for backward compatibility

  if (typeof id !== 'string') {
    return null
  }

  const component = id ? tree.components.get(id) : undefined

  if (!component) {
    return null
  }

  return tree.getRootElementOfComponent(component)
}
