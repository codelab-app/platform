import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateFieldModalService')
export class CreateFieldModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IInterfaceTypeModel>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<
      Ref<IInterfaceTypeModel>,
      { interface?: IInterfaceTypeModel }
    >
{
  @computed
  get interface() {
    return this.metadata?.current
  }
}

@model('@codelab/FieldModalService')
export class FieldModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IFieldModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IFieldModel>, { field?: IFieldModel }>
{
  @computed
  get field() {
    return this.metadata?.current
  }
}
