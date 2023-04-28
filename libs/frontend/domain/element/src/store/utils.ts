import type { IAtom, IComponent } from '@codelab/frontend/abstract/core'
import { atomRef, componentRef } from '@codelab/frontend/abstract/core'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import { IRenderTypeKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'

export const getRenderType = (
  renderType: IElementDTO['renderType'],
): Ref<IAtom> | Ref<IComponent> | null => {
  if (renderType?.kind === IRenderTypeKind.Atom) {
    return atomRef(renderType.id)
  }

  if (renderType?.kind === IRenderTypeKind.Component) {
    return componentRef(renderType.id)
  }

  return null
}
