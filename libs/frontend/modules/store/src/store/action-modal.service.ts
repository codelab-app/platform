import { ModalService } from '@codelab/frontend/shared/utils'
import { IAction, IModalService } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Action } from './action.model'

@model('@codelab/ActionModalService')
export class ActionModalService
  extends ExtendedModel(modelClass<ModalService<Ref<Action>>>(ModalService), {})
  implements IModalService<Ref<IAction>, { action: Maybe<IAction> }>
{
  @computed
  get action() {
    return this.metadata?.current
  }
}
