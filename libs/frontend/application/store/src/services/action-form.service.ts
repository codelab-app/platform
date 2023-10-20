import type { IEntityFormService } from '@codelab/frontend/abstract/application'
import type {
  IActionModel,
  IStoreModel,
} from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateActionFormService')
export class CreateActionFormService
  extends ExtendedModel(
    modelClass<InlineFormService<IStoreModel>>(InlineFormService),
    {},
  )
  implements IEntityFormService<IStoreModel, { store?: IStoreModel }>
{
  @computed
  get store() {
    return this.metadata
  }
}

@model('@codelab/ActionFormService')
export class ActionFormService
  extends ExtendedModel(
    modelClass<InlineFormService<IActionModel>>(InlineFormService),
    {},
  )
  implements IEntityFormService<IActionModel, { action?: IActionModel }>
{
  @computed
  get action() {
    return this.metadata
  }
}
