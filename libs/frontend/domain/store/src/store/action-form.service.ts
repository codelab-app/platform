import type {
  IAction,
  IEntityFormService,
  IStore,
} from '@codelab/frontend/abstract/core'
import { InlineFormService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateActionFormService')
export class CreateActionFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IStore>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<IStore>, { store: Maybe<IStore> }>
{
  @computed
  get store() {
    return this.metadata?.current
  }
}

@model('@codelab/ActionFormService')
export class ActionFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IAction>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<IAction>, { action: Maybe<IAction> }>
{
  @computed
  get action() {
    return this.metadata?.current
  }
}
