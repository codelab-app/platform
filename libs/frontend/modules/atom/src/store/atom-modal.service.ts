import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Atom } from './atom.model'

@model('codelab/AtomModalService')
export class AtomModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Ref<Atom>>>(ModalService),
  props: {},
})) {
  @computed
  get atom() {
    return this.metadata?.current ?? null
  }
}

@model('codelab/AtomsModalService')
export class AtomsModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Array<Ref<Atom>>>>(ModalService),
  props: {},
})) {
  @computed
  get atoms() {
    return this.metadata?.map((atom) => atom.current) ?? []
  }
}
