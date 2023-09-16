import type {
  IAtomModel,
  IEntityModalService,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AtomModalService')
export class AtomModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IAtomModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IAtomModel>, { atom: Maybe<IAtomModel> }>
{
  @computed
  get atom() {
    return this.metadata?.current
  }
}

@model('@codelab/AtomsModalService')
export class AtomsModalService
  extends ExtendedModel(
    modelClass<ModalService<Array<Ref<IAtomModel>>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<Array<Ref<IAtomModel>>, { atoms: Array<IAtomModel> }>
{
  @computed
  get atoms() {
    return this.metadata?.map((atom) => atom.current) ?? []
  }
}
