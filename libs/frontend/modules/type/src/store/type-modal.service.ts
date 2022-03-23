import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { AnyType } from './models'

@model('codelab/TypeModalService')
export class TypeModalService extends ExtendedModel(
  modelClass<ModalService<Ref<AnyType>>>(ModalService),
  {},
) {
  @computed
  get type() {
    return this.metadata?.current ?? null
  }
}
