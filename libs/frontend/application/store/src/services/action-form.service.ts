import type { IEntityFormService } from '@codelab/frontend/abstract/application'
import type {
  IActionModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateActionFormService')
export class CreateActionFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IStoreModel>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<IStoreModel>, { store?: IStoreModel }>
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
  implements IEntityFormService<Ref<IActionModel>, { action?: IActionModel }>
{
  @computed
  get action() {
    return this.metadata?.current
  }
}
