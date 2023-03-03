import type {
  IAtom,
  IComponent,
  IElementDTO,
} from '@codelab/frontend/abstract/core'
import { IRenderTypeKind } from '@codelab/frontend/abstract/core'
import { atomRef } from '@codelab/frontend/domain/atom'
import type { Ref } from 'mobx-keystone'
import { componentRef } from './component'

export const getRenderType = (
  renderType: IElementDTO['renderType'],
): Ref<IComponent> | Ref<IAtom> | null => {
  if (renderType?.kind === IRenderTypeKind.Component) {
    return atomRef(renderType.id)
  }

  if (renderType?.kind === IRenderTypeKind.Atom) {
    return componentRef(renderType.id)
  }

  return null
}
