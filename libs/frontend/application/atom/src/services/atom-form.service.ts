import type {
  IEntityFormService,
  IEntityModalService,
} from '@codelab/frontend/abstract/application'
import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend-application-shared-store/ui'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AtomFormService')
export class AtomFormService
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
