import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/TypeModalService')
export class TypeModalService
  extends ExtendedModel(modelClass<ModalService<ITypeModel>>(ModalService), {})
  implements IEntityModalService<ITypeModel, { type?: ITypeModel }>
{
  @computed
  get type() {
    return this.metadata
  }
}
