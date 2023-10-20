import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import type { IField, IInterfaceType } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateFieldModalService')
export class CreateFieldModalService
  extends ExtendedModel(
    modelClass<ModalService<IInterfaceTypeModel>>(ModalService),
    {},
  )
  implements
    IEntityModalService<
      IInterfaceTypeModel,
      { interface?: IInterfaceTypeModel }
    >
{
  @computed
  get interface() {
    return this.metadata
  }
}

@model('@codelab/FieldModalService')
export class FieldModalService
  extends ExtendedModel(modelClass<ModalService<IFieldModel>>(ModalService), {})
  implements IEntityModalService<IFieldModel, { field?: IFieldModel }>
{
  @computed
  get field() {
    return this.metadata
  }
}
