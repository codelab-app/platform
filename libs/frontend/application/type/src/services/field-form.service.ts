import type { IEntityFormService } from '@codelab/frontend/abstract/application'
import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateFieldFormService')
export class CreateFieldFormService
  extends ExtendedModel(
    modelClass<InlineFormService<IInterfaceTypeModel>>(InlineFormService),
    {},
  )
  implements
    IEntityFormService<
      IInterfaceTypeModel,
      { interface?: IInterfaceTypeModel }
    >
{
  @computed
  get interface() {
    return this.metadata
  }
}

@model('@codelab/FieldFormService')
export class FieldFormService
  extends ExtendedModel(
    modelClass<InlineFormService<IFieldModel>>(InlineFormService),
    {},
  )
  implements IEntityFormService<IFieldModel, { field?: IFieldModel }>
{
  @computed
  get field() {
    return this.metadata
  }
}
