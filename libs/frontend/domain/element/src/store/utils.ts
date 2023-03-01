import type {
  IAtom,
  IComponent,
  IElementDTO,
} from '@codelab/frontend/abstract/core'
import { atomRef } from '@codelab/frontend/domain/atom'
import { componentRef } from '@codelab/frontend/presenter/container'
import type { Ref } from 'mobx-keystone'

export const getRenderType = ({
  renderAtomType,
  renderComponentType,
}: Pick<IElementDTO, 'renderAtomType' | 'renderComponentType'>):
  | Ref<IComponent>
  | Ref<IAtom>
  | null => {
  let renderType = null

  if (renderAtomType) {
    renderType = atomRef(renderAtomType.id)
  }

  if (renderComponentType) {
    renderType = componentRef(renderComponentType.id)
  }

  return renderType
}
