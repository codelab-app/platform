import type {
  IAtom,
  IComponent,
  IElementDTO,
} from '@codelab/frontend/abstract/core'
import { IRenderTypeModel } from '@codelab/frontend/abstract/core'
import { atomRef } from '@codelab/frontend/domain/atom'
import { componentRef } from '@codelab/frontend/presenter/container'
import type { Ref } from 'mobx-keystone'

export const getRenderType = (
  renderType: IElementDTO['renderType'],
): Ref<IComponent> | Ref<IAtom> | null => {
  if (renderType?.model === IRenderTypeModel.Component) {
    return atomRef(renderType.id)
  }

  if (renderType?.model === IRenderTypeModel.Atom) {
    return componentRef(renderType.id)
  }

  return null
}
