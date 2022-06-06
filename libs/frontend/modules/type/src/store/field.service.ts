import { ModalService } from '@codelab/frontend/shared/utils'
import {
  IFieldModalMetadata,
  IFieldModalProperties,
  IModalService,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/FieldModalService')
export class FieldModalService
  extends ExtendedModel(
    modelClass<ModalService<IFieldModalMetadata>>(ModalService),
    {},
  )
  implements IModalService<IFieldModalMetadata, IFieldModalProperties>
{
  @computed
  get interface() {
    return this.metadata?.interface?.current
  }

  @computed
  get field() {
    return this.metadata?.field?.current
  }
}
