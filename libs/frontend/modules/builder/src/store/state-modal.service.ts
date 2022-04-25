import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'
import { IStateTreeNode } from '../renderer/utils/platformState'

@model('@codelab/StoreModalService')
export class StateModalService extends ExtendedModel(() => ({
  baseModel: modelClass<ModalService<IStateTreeNode>>(ModalService),
  props: {},
})) {
  @computed
  get node() {
    return this.metadata ?? null
  }
}
