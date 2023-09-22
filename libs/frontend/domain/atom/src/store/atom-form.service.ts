import type {
  IAtomModel,
  IEntityFormService,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AtomFormService')
export class AtomFormService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IAtomModel>>>(ModalService),
    {},
  )
  implements IEntityFormService<Ref<IAtomModel>, { atom: Maybe<IAtomModel> }>
{
  @computed
  get atom() {
    return this.metadata?.current
  }
}

@model('@codelab/AtomsFormService')
export class AtomsFormService
  extends ExtendedModel(
    modelClass<ModalService<Array<Ref<IAtomModel>>>>(ModalService),
    {},
  )
  implements
    IEntityFormService<Array<Ref<IAtomModel>>, { atoms: Array<IAtomModel> }>
{
  @computed
  get atoms() {
    return this.metadata?.map((atom) => atom.current) ?? []
  }
}
