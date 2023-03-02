import { IRenderTypeModel } from '@codelab/frontend/abstract/core'
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
      model: IRenderTypeModel.Component,
    }
  }

  if (renderComponentType) {
    return {
      id,
      model: IRenderTypeModel.Atom,
    }
  }

  return null
}
