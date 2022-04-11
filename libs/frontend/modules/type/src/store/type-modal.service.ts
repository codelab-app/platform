import { ModalService } from '@codelab/frontend/shared/utils'
import { IAnyType, IInterfaceType } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('codelab/TypeModalService')
export class TypeModalService extends ExtendedModel(
  modelClass<ModalService<Ref<IAnyType>>>(ModalService),
  {},
) {
  @computed
  get type() {
    return this.metadata?.current ?? null
  }
}

@model('codelab/InterfaceTypeModalService')
export class InterfaceTypeModalService extends ExtendedModel(
  modelClass<ModalService<Ref<IInterfaceType>>>(ModalService),
  {},
) {
  @computed
  get interface() {
    return this.metadata?.current ?? null
  }
}
