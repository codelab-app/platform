import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/DomainModalService')
export class DomainModalService
  extends ExtendedModel(
    modelClass<ModalService<IDomainModel>>(ModalService),
    {},
  )
  implements IEntityModalService<IDomainModel, { domain?: IDomainModel }>
{
  @computed
  get domain() {
    return this.metadata
  }
}
