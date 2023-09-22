import type {
  IActionModel,
  IEntityFormService,
  IStoreModel,
} from '@codelab/frontend/abstract/core'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateActionFormService')
export class CreateActionFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IStoreModel>>>(InlineFormService),
    {},
  )
  implements
    IEntityFormService<Ref<IStoreModel>, { store: Maybe<IStoreModel> }>
{
  @computed
  get store() {
    return this.metadata?.current
  }
}

@model('@codelab/ActionFormService')
export class ActionFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IActionModel>>>(InlineFormService),
    {},
  )
  implements
    IEntityFormService<Ref<IActionModel>, { action: Maybe<IActionModel> }>
{
  @computed
  get action() {
    return this.metadata?.current
  }
}
