import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AtomModalService')
export class AtomModalService
  extends ExtendedModel(modelClass<ModalService<IAtomModel>>(ModalService), {})
  implements IEntityModalService<IAtomModel, { atom?: IAtomModel }>
{
  @computed
  get atom() {
    return this.metadata
  }
}

@model('@codelab/AtomsModalService')
export class AtomsModalService
  extends ExtendedModel(
    modelClass<ModalService<Array<IAtomModel>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<Array<IAtomModel>, { atoms: Array<IAtomModel> }>
{
  @computed
  get atoms() {
    return this.metadata ?? []
  }
}
