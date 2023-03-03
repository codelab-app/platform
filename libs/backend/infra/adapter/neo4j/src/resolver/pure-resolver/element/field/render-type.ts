import { IRenderTypeKind } from '@codelab/frontend/abstract/core'
import type { Element } from '@codelab/shared/abstract/codegen'

export const renderType = ({
  id,
  __typename,
  renderAtomType,
  renderComponentType,
}: Pick<
  Element,
  'id' | 'renderAtomType' | 'renderComponentType' | '__typename'
>) => {
  if (!__typename) {
    return null
  }

  if (renderAtomType) {
    return {
      id,
      kind: IRenderTypeKind.Component,
    }
  }

  if (renderComponentType) {
    return {
      id,
      kind: IRenderTypeKind.Atom,
    }
  }

  return null
}
