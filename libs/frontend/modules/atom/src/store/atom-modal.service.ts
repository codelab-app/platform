import { ModalService } from '@codelab/frontend/shared/utils'
import { IModalService } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Atom } from './atom.model'

@model('@codelab/AtomModalService')
export class AtomModalService
  extends ExtendedModel(() => ({
    baseModel: modelClass<ModalService<Ref<Atom>>>(ModalService),
    props: {},
  }))
  implements IModalService<Ref<Atom>>
{
  @computed
  get atom() {
    return this.metadata?.current ?? null
  }
}

@model('@codelab/AtomsModalService')
export class AtomsModalService
  extends ExtendedModel(() => ({
    baseModel: modelClass<ModalService<Array<Ref<Atom>>>>(ModalService),
    props: {},
  }))
  implements IModalService<Array<Ref<Atom>>>
{
  @computed
  get atoms() {
    return this.metadata?.map((atom) => atom.current) ?? []
  }
}
