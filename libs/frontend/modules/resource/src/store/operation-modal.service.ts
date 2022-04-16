import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Operation } from './operation.model'

@model('codelab/OperationModalService')
export class OperationModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<Ref<Operation>>>(ModalService),
  props: {},
})) {
  @computed
  get operation() {
    return this.metadata?.current ?? null
  }
}
