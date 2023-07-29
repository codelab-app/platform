import type { IAtom, IEntityFormService } from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AtomFormService')
export class AtomFormService
  extends ExtendedModel(modelClass<ModalService<Ref<IAtom>>>(ModalService), {})
  implements IEntityFormService<Ref<IAtom>, { atom: Maybe<IAtom> }>
{
  @computed
  get atom() {
    return this.metadata?.current
  }
}

@model('@codelab/AtomsFormService')
export class AtomsFormService
  extends ExtendedModel(
    modelClass<ModalService<Array<Ref<IAtom>>>>(ModalService),
    {},
  )
  implements IEntityFormService<Array<Ref<IAtom>>, { atoms: Array<IAtom> }>
{
  @computed
  get atoms() {
    return this.metadata?.map((atom) => atom.current) ?? []
  }
}
