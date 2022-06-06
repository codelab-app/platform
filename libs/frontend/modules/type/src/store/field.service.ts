import { ModalService } from '@codelab/frontend/shared/utils'
import {
  IFieldModalMetadata,
  IFieldModalProperties,
  IModalService,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'
import { InterfaceType } from './models'

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
    // interface is required so we can't open modal without it
    return this.metadata?.interface.current as InterfaceType
  }

  @computed
  get field() {
    return this.metadata?.field?.current
  }
}
