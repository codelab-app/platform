import type {
  IAtom,
  IEntityModalService,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AtomModalService')
export class AtomModalService
  extends ExtendedModel(modelClass<ModalService<Ref<IAtom>>>(ModalService), {})
  implements IEntityModalService<Ref<IAtom>, { atom: Maybe<IAtom> }>
{
  @computed
  get atom() {
    return this.metadata?.current
  }
}

@model('@codelab/AtomsModalService')
export class AtomsModalService
  extends ExtendedModel(
    modelClass<ModalService<Array<Ref<IAtom>>>>(ModalService),
    {},
  )
  implements IEntityModalService<Array<Ref<IAtom>>, { atoms: Array<IAtom> }>
{
  @computed
  get atoms() {
    return this.metadata?.map((atom) => atom.current) ?? []
  }
}
