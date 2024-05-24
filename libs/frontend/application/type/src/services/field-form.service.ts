import type { IEntityFormService } from '@codelab/frontend/abstract/application'
import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend-application-shared-store/ui'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateFieldFormService')
export class CreateFieldFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IInterfaceTypeModel>>>(InlineFormService),
    {},
  )
  implements
    IEntityFormService<
      Ref<IInterfaceTypeModel>,
      { interface?: IInterfaceTypeModel }
    >
{
  @computed
  get interface() {
    return this.metadata?.current
  }
}

@model('@codelab/FieldFormService')
export class FieldFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IFieldModel>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<IFieldModel>, { field?: IFieldModel }>
{
  @computed
  get field() {
    return this.metadata?.current
  }
}
