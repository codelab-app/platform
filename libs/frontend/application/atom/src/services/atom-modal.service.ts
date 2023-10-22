import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AtomModalService')
export class AtomModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IAtomModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IAtomModel>, { atom?: IAtomModel }>
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
    return this.metadata?.map((atom) => atom.current)
  }
}
