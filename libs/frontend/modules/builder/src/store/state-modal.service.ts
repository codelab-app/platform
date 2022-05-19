import { ModalService } from '@codelab/frontend/shared/utils'
import {
  IModalService,
  IStateTreeNode,
  StateModalProperties,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/StoreModalService')
export class StateModalService
  extends ExtendedModel(
    modelClass<ModalService<IStateTreeNode>>(ModalService),
    {},
  )
  implements IModalService<IStateTreeNode, StateModalProperties>
{
  @computed
  get node() {
    return this.metadata
  }
}
