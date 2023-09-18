import type { Element } from '@codelab/shared/abstract/codegen'
import { ElementRenderTypeKind } from '@codelab/shared/abstract/core'

export const renderType = (element: Element) => {
  const { renderAtomType, renderComponentType } = element

  if (renderAtomType?.id) {
    return {
      id: renderAtomType.id,
      kind: ElementRenderTypeKind.Atom,
    }
  }

  if (renderComponentType?.id) {
    return {
      id: renderComponentType.id,
      kind: ElementRenderTypeKind.Component,
    }
  }

  return null
}
