import type {
  IAtom,
  IComponent,
  IElementDTO,
} from '@codelab/frontend/abstract/core'
import { componentRef, IRenderTypeKind } from '@codelab/frontend/abstract/core'
import { atomRef } from '@codelab/frontend/domain/atom'
import type { Ref } from 'mobx-keystone'

export const getRenderType = (
  renderType: IElementDTO['renderType'],
): Ref<IComponent> | Ref<IAtom> | null => {
  if (renderType?.kind === IRenderTypeKind.Atom) {
    return atomRef(renderType.id)
  }

  if (renderType?.kind === IRenderTypeKind.Component) {
    return componentRef(renderType.id)
  }

  return null
}
