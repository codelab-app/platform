import { IRenderTypeKind } from '@codelab/frontend/abstract/core'
import type { Element } from '@codelab/shared/abstract/codegen'

export const renderType = (element: Element) => {
  const { renderAtomType, renderComponentType } = element

  if (renderAtomType?.id) {
    return {
      id: renderAtomType.id,
      kind: IRenderTypeKind.Atom,
    }
  }

  if (renderComponentType?.id) {
    return {
      id: renderComponentType.id,
      kind: IRenderTypeKind.Component,
    }
  }

  return null
}
