import {
  IEntityModalService,
  IFieldModalMetadata,
  IFieldModalProperties,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/FieldModalService')
export class FieldModalService
  extends ExtendedModel(
    modelClass<ModalService<IFieldModalMetadata>>(ModalService),
    {},
  )
  implements IEntityModalService<IFieldModalMetadata, IFieldModalProperties>
{
  @computed
  get interface() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return this.metadata?.interface?.maybeCurrent
  }

  @computed
  get field() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return this.metadata?.field?.maybeCurrent
  }
}
